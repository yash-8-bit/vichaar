import z from "zod";

const postSchema = z.object({
  title: z
    .string("Title is Required")
    .trim()
    .min(10, "Atleast 10 length Required")
    .max(255, "Maximum 255 length"),
  description: z.string("Description is Required"),
  categoryId: z.number("Category id is required").min(1),
});

export type postSchemaType = z.infer<typeof postSchema>;

export default postSchema;
