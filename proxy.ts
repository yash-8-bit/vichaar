import { type NextRequest, NextResponse } from "next/server";
import { response } from "./app/utils/response.util";
import { verifyToken } from "./app/utils/jwt.util";

export function proxy(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("__vichaar__");
  const res_ = response({
    message: "Invalid Token",
    status: 401,
  });
  if (!token || !token.value) {
    return res_;
  }
  const data = verifyToken<{ id: number; name: string; email: string }>(
    token.value
  );
  if (!data) {
    return res_;
  }
  const nextres = NextResponse.next();
  nextres.headers.set("user-id", String(data.id));
  return nextres;
}

export const config = {
  matcher: "/api/:path*",
};
