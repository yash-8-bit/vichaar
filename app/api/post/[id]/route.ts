import prisma from "@/lib/prisma";
import { deletefile, upload } from "@/utils/cloudinary.util";
import { TryBackend } from "@/utils/ErrorHandle.util";
import { response } from "@/utils/response.util";
import { Validate } from "@/utils/zodValidation";
import {
  postSchemaOptional,
  postSchemaType,
} from "@/validations/zod/post.user";
import { NextRequest } from "next/server";

export async function GET(
  res: NextRequest,
  ctx: RouteContext<"/api/post/[id]">
) {
  const { id } = await ctx.params;
  return TryBackend(async () => {
    const data = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        comment: true,
      },
    });
    return response({
      data,
      status: 200,
    });
  });
}

export async function PUT(
  req: NextRequest,
  ctx: RouteContext<"/api/post/[id]">
) {
  const { id } = await ctx.params;
  return TryBackend(async () => {
    const userId = parseInt(req.headers.get("_id") as string);
    const isexisted = await prisma.post.findUnique({
      where: { id: parseInt(id), authorId: userId },
    });
    if (!isexisted) {
      return response({
        status: 404,
        message: "Post Not Found",
      });
    }
    const fd = await req.formData();
    const body: any = {};
    fd.forEach(
      (value, key) =>
        (body[key] = key === "categoryId" ? parseInt(value as string) : value)
    );
    if (!body) {
      return response({
        status: 400,
        message: "No Fields Provided",
      });
    }
    let imageUrl: string | null = null;
    if (body?.image && body.image instanceof File) {
      const { success: success_, data: data_ } = await deletefile(
        isexisted.image
      );
      if (!success_) return data_;
      const { success, data } = await upload({ file: body.image });
      if (!success) return data;
      imageUrl = data as string;
      delete body["image"];
    }
    const result = await Validate<postSchemaType>(postSchemaOptional, {
      ...body,
      published: body?.published ? body.published : false,
    });
    if (!result.data)
      return response({
        status: 400,
        message: result.message,
      });
    const Updated = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...result.data,
        ...(imageUrl ? { image: imageUrl } : {}),
      },
    });
    return response({
      message: "Post Updated Successfully",
      status: 201,
      extra: {
        name: Updated.title,
      },
    });
  });
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/post/[id]">
) {
  const { id } = await ctx.params;
  return TryBackend(async () => {
    const userId = parseInt(req.headers.get("_id") as string);
    const isexisted = await prisma.post.findUnique({
      where: { id: parseInt(id), authorId: userId },
    });
    if (!isexisted) {
      return response({
        status: 404,
        message: "Post Not Found",
      });
    }
    const url = isexisted.image;
    const { success, data: data_ } = await deletefile(url);
    if (!success) {
      return data_;
    }
    const data = await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
      include: {
        comment: true,
      },
    });
    return response({
      message: "Post Deleted Successfully",
      status: 200,
      extra: {
        name: data.title,
      },
    });
  });
}
