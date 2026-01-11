import prisma from "@/app/lib/prisma";
import { TryBackend } from "@/app/utils/ErrorHandle.util";
import { response } from "@/app/utils/response.util";

export async function DELETE(
  ctx: RouteContext<"/api/post/category/[id]">
) {
  const { id } = await ctx.params;
  return TryBackend(async () => {
    const data = await prisma.postCategory.delete({
      where: {
        id: parseInt(id),
      },
    });
    return response({
      message: "Post Category Deleted Successfully",
      status: 200,
      extra: {
        ...data,
      },
    });
  });
}
