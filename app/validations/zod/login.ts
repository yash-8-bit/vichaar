import { z } from "zod";
const loginSchema = z.object({
  email: z.email("Email is invalid"),
  password: z
    .string("Password is required")
    .trim()
    .min(6, "Atleast 6 length required")
    .max(12, "Maximum 12 length"),
});
export type loginSchemaType = z.infer<typeof loginSchema>;

export default loginSchema;
