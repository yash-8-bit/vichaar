import z from "zod";

const userSchema = z.object({
  first_name: z.string("First Name is Required").trim(),
  last_name: z.string().trim().optional(),
  bio: z.string().optional(),
});

export type userSchemaType = z.infer<typeof userSchema>;
export const userSchemaOptional = userSchema.partial().strict();
export default userSchema;
