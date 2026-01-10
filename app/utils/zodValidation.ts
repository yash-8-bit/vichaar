import { ZodObject, ZodSafeParseResult } from "zod";

export async function Validate<T>(
  schema: ZodObject,
  data: T
): Promise<{
  message: string;
  data: T | null;
}> {
  const parsed = await schema.safeParseAsync(data);
  if (parsed.success) {
    return { message: "", data: parsed.data as T };
  }

  return { message: parsed.error.issues[0].message, data: null };
}
