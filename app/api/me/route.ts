import prisma from "@/lib/prisma";
import { verifyToken } from "@/utils/jwt.util";
import { response } from "@/utils/response.util";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("__vichaar__");
  const res_ = response({
    message: "Invalid Token",
    status: 401,
  });
  if (!token || !token.value) {
    return res_;
  }
  const data = verifyToken<{
    id: number;
    role: string;
  }>(token.value);
  if (!data) {
    return res_;
  }

  if (data.role === "admin") {
    const admin_ = await prisma.admin.findUnique({
      where: {
        id: data.id,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return response({
      data: {
        id: data.id,
        name: admin_?.name,
        email: admin_?.email,
      },
      status: 200,
    });
  }
  return response({
    data: data,
    status: 200,
  });
}
