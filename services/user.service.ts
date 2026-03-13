import { ApiTryCatch } from "@/utils/trycatch.util";

export const getUsers = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  return ApiTryCatch(async () => {
    const res = await fetch(`/api/user?page=${page}&limit=${limit}`);
    const body = await res.json();
    return body;
  });
};
