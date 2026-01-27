import prisma from "@/lib/prisma";
import { TryBackend } from "@/utils/ErrorHandle.util";
import { response } from "@/utils/response.util";
import { getSlug } from "@/utils/slug.util";
import { Validate } from "@/utils/zodValidation";
import postCategorySchema, {
  postCategorySchemaType,
} from "@/validations/zod/postCategory.admin";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return TryBackend(async () => {
    const data = await prisma.postCategory.findMany();
    return response({
      status: 200,
      data: data,
    });
  });
}

export async function POST(req: NextRequest) {
  return TryBackend(async () => {
    const body = await req.json();
    const result = await Validate<postCategorySchemaType>(
      postCategorySchema,
      body
    );
    if (!result.data)
      return response({
        status: 400,
        message: result.message,
      });
    const { id } = await prisma.postCategory.create({
      data: {
        name: result.data.name,
        slug: getSlug(result.data.name),
      },
    });
    return response({
      message: "Post Category Created Successfully",
      status: 201,
      extra: {
        id,
      },
    });
  });
}
