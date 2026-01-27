import { ApiTryCatch } from "@/utils/trycatch.util";
import { loginSchemaType } from "@/validations/zod/login";
import { registerSchemaType } from "@/validations/zod/register.user";

export const loginuser = (data: loginSchemaType) => {
  return ApiTryCatch(async () => {
    const res = await fetch("/api/auth/user/login", {
      body: JSON.stringify(data),
      method : "POST"
    });
    const body = await res.json();
    return body;
  });
};


export const loginadmin = (data: loginSchemaType) => {
  return ApiTryCatch(async () => {
    const res = await fetch("/api/auth/admin/login", {
      body: JSON.stringify(data),
      method : "POST"
    });
    const body = await res.json();
    return body;
  });
};

export const registeruser = (data: registerSchemaType) => {
  return ApiTryCatch(async () => {
    const res = await fetch("/api/auth/user/register", {
      body: JSON.stringify(data),
      method : "POST"
    });
    const body = await res.json();
    return body;
  });
};
