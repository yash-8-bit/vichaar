import { type NextRequest, NextResponse } from "next/server";
import { response } from "./utils/response.util";
import { verifyToken } from "./utils/jwt.util";

export async function proxy(req: NextRequest, res: NextResponse) {
   
  // const token = req.cookies.get("__vichaar__");
  // const res_ = response({
  //   message: "Invalid Token",
  //   status: 401,
  // });
  // if (!token || !token.value) {
  //   return res_;
  // }
  // const data = verifyToken<{
  //   id: number;
  //   name: string;
  //   email: string;
  //   role: string;
  // }>(token.value);
  // if (!data) {
  //   return res_;
  // }
  const nextres = NextResponse.next();
  // nextres.headers.set("_id", String(data.id));
  // nextres.headers.set("_role", String(data.role));
  return nextres;
}
export const config = {
  matcher: "/api/:path*",
};
