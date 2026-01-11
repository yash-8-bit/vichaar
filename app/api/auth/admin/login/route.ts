import prisma from "@/app/lib/prisma";
import { Validate } from "@/app/utils/zodValidation";
import loginSchema, { loginSchemaType } from "@/app/validations/zod/login";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/utils/jwt.util";
import { TryBackend } from "@/app/utils/ErrorHandle.util";
import { response } from "@/app/utils/response.util";

export async function POST(req: NextRequest) {
  return TryBackend(async () => {
    const body = await req.json();
    const result = await Validate<loginSchemaType>(loginSchema, body);
    if (!result.data)
      return response({
        status: 400,
        message: result.message,
      });
    const admin = await prisma.admin.findUnique({
      where: {
        email: result.data.email,
      },
    });
    const isMatch: Boolean = admin
      ? await bcrypt.compare(result.data.password, admin.password)
      : false;
    if (!admin || !isMatch) {
      return response({
        message: "Invalid Email or Password",
        status: 401,
      });
    }
    const token = generateToken({
      id: admin.id,
      name: admin.name,
      email: admin.email,
    });
    const response_ = NextResponse.json(
      {
        success: true,
        message: "Login Successfull",
        token,
      },
      {
        status: 200,
      }
    );
    response_.cookies.set("__vichaar__", token, {
      httpOnly: true,
    });
    return response_;
  });
}
