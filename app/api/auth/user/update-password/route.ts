import prisma from "@/app/lib/prisma";
import { TryBackend } from "@/app/utils/ErrorHandle.util";
import { response } from "@/app/utils/response.util";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  return TryBackend(async () => {
    const userId = parseInt(req.headers.get("_id") as string);
    const body = await req.json(); 
    const arr = ["old_password", "new_password"];
    for (const i of arr)
      if (!body[i]) {
        return response({
          status: 400,
          message: `${i.replaceAll("_", " ").toLowerCase()} is Required`,
        });
      }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const isMatch: Boolean = user
      ? await bcrypt.compare(body.old_password, user.password)
      : false;
    if (!isMatch) {
      return response({
        message: "Invalid Password",
        status: 401,
      });
    }
    const Updated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: await bcrypt.hash(body.new_password, 12),
      },
    });
    return response({
      message: "Password Change Successfully",
      status: 201,
      extra: {
        name: Updated.first_name,
      },
    });
  });
}
