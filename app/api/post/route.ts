import prisma from "@/app/lib/prisma";
import { upload } from "@/app/utils/cloudinary.util";
import { TryBackend } from "@/app/utils/ErrorHandle.util";
import { response } from "@/app/utils/response.util";
import { getSlug } from "@/app/utils/slug.util";
import { Validate } from "@/app/utils/zodValidation";
import postSchema, { postSchemaType } from "@/app/validations/zod/post.user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return TryBackend(async () => {
    const data = await prisma.post.findMany();
    return response({
      status: 200,
      data: data,
    });
  });
}

export async function POST(req: NextRequest) {
  return TryBackend(async () => {
    const fd = await req.formData();
    const image = fd.get("image");
    if (!image || !(image instanceof File)) {
      return response({
        message: "Blog Image is Required",
        status: 400,
      });
    }
    const body: any = {};
    fd.forEach(
      (value, key) =>
        (body[key] = key === "categoryId" ? parseInt(value as string) : value)
    );
    const result = await Validate<postSchemaType>(postSchema, {
      ...body,
      published: body?.published ? body.published : false,
    });
    if (!result.data)
      return response({
        status: 400,
        message: result.message,
      });
    const { success, data } = await upload({ file: image });
    if (!success) {
      return data;
    }
    const userId = parseInt(req.headers.get("user-id") as string);
    const post = await prisma.post.create({
      data: {
        title: result.data.title,
        image: data as string,
        categoryId: result.data.categoryId,
        authorId: userId,
        description: result.data.description,
        slug: getSlug(result.data.title),
        published: result.data.published,
      },
    });
    return response({
      message: "Post Created Successfully",
      status: 201,
      extra: {
        id: post.id,
      },
    });
  });
}
