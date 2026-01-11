import z from "zod";
import loginSchema from "./login";

const registerSchema = loginSchema.extend({
  first_name: z.string("First Name is Required")
   .trim()
});


export type registerSchemaType = z.infer<typeof registerSchema>;

export default registerSchema;