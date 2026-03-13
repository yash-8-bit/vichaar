import { ApiTryCatch } from "@/utils/trycatch.util";

export const getMe = () => {
  return ApiTryCatch(async () => {
    const res = await fetch(`/api/me`);
    const body = await res.json();
    return body;
  });
};
