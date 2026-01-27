import prisma from "@/lib/prisma";
import { TryBackend } from "@/utils/ErrorHandle.util";
import { response } from "@/utils/response.util";
import { Validate } from "@/utils/zodValidation";
import postCommentSchema, {
  postCommentSchemaType,
} from "@/validations/zod/postComment.user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return TryBackend(async () => {
    const data = await prisma.comments.findMany();
    return response({
      status: 200,
      data: data,
    });
  });
}

export async function POST(req: NextRequest) {
  return TryBackend(async () => {
    const body = await req.json();
    const result = await Validate<postCommentSchemaType>(postCommentSchema, {
      ...body,
      postId: body?.postId ? parseInt(body?.postId) : -1,
    });
    if (!result.data)
      return response({
        status: 400,
        message: result.message,
      });
    const isexisted = await prisma.post.findUnique({
      where: { id: result.data.postId },
    });
    if (!isexisted) {
      return response({
        status: 404,
        message: "Post Id is Invalid",
      });
    }
    const userId = parseInt(req.headers.get("_id") as string);
    const { id } = await prisma.comments.create({
      data: {
        postId: result.data.postId,
        comment: result.data.comment,
        userId: userId,
      },
    });
    return response({
      message: "Comment Created Successfully",
      status: 201,
      extra: {
        id,
      },
    });
  });
}
