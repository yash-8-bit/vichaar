import { z } from "zod";

const postCommentSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(10, "Minimum 10 length Required")
    .max(500, "Maximum 500 length Required"),
  postId: z.number("Post id is required").min(1),
});

export type postCommentSchemaType = z.infer<typeof postCommentSchema>;

export default postCommentSchema;
