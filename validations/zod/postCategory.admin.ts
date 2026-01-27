import z from "zod";

const postCategorySchema = z.object({
  name: z
    .string("Category Name is Required")
    .trim()
    .min(5, "Atleast 5 length Required")
    .max(255, "Maximum 255 length"),
});

export type postCategorySchemaType = z.infer<typeof postCategorySchema>;

export default postCategorySchema;
