import prisma from "@/lib/prisma";
import { Validate } from "@/utils/zodValidation";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { TryBackend } from "@/utils/ErrorHandle.util";
import registerSchema, {
  registerSchemaType,
} from "@/validations/zod/register.user";
import { response } from "@/utils/response.util";

export async function POST(req: NextRequest) {
  return TryBackend(async () => {
    const body = await req.json();
    const result = await Validate<registerSchemaType>(registerSchema, body);
    if (!result.data)
      return response({
        status: 400,
        message: result.message,
      });
    const existed = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (existed) {
      return response({
        status: 409,
        message: "User Already Exist",
      });
    }
    const user = await prisma.user.create({
      data: {
        email: result.data.email,
        password: await bcrypt.hash(result.data.password, 12),
        first_name: result.data.first_name,
        uid: nanoid(),
      },
    });
    return response({
      message: "User Created",
      extra: {
        id: user.id,
      },
      status: 201,
    });
  });
}
