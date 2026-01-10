import { TryBackend } from "@/app/utils/ErrorHandle.util";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return TryBackend(async () => {});
}
