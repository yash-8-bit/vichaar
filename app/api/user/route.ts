import prisma from "@/lib/prisma";
import { deletefile, upload } from "@/utils/cloudinary.util";
import { TryBackend } from "@/utils/ErrorHandle.util";
import { response } from "@/utils/response.util";
import { Validate } from "@/utils/zodValidation";
import  { userSchemaOptional, userSchemaType } from "@/validations/zod/user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return TryBackend(async () => {
    const role = req.headers.get("_role");
    if (role === "admin") {
      return response({
        status: 200,
        data: await prisma.user.findMany({
          select: {
            email: true,
            first_name: true,
            last_name: true,
            createdAt: true,
          },
        }),
      });
    } else {
      const id = req.headers.get("_id");
      return response({
        status: 200,
        data: await prisma.user.findUnique({
          where: {
            id: parseInt(id as string),
          },
        }),
      });
    }
  });
}

export async function PUT(req: NextRequest) {
  return TryBackend(async () => {
    const userId = parseInt(req.headers.get("_id") as string);
    const fd = await req.formData();
    const body: any = {};
    fd.forEach((value, key) => (body[key] = value));
    if (!body) {
      return response({
        status: 400,
        message: "No Fields Provided",
      });
    }
    let imageUrl: string | null = null;
    if (body?.image && body.image instanceof File) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user?.image) {
        const { success: success_, data: data_ } = await deletefile(user.image);
        if (!success_) return data_;
      }
      const { success, data } = await upload({ file: body.image });
      if (!success) return data;
      imageUrl = data as string;
      delete body["image"];
    }
    const result = await Validate<userSchemaType>(userSchemaOptional, {
      ...body,
    });
    if (!result.data)
      return response({
        status: 400,
        message: result.message,
      });
    const Updated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...result.data,
        ...(imageUrl ? { image: imageUrl } : {}),
      },
    });
    return response({
      message: "User Updated Successfully",
      status: 201,
      extra: {
        name: Updated.first_name,
      },
    });
  });
}
