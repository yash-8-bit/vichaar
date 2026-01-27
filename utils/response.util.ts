import { NextResponse } from "next/server";

const SUCCESSCODES = [200,201] 

export const response = ({
  message = "",
  data = null,
  status,
  extra = {},
}: {
  message?: string;
  data?: any;
  status: number;
  extra?: Record<any, any>;
}) =>
  NextResponse.json(
    {
      success : SUCCESSCODES.includes(status),
      ...(message ? { message } : {}),
      ...(data ? { data } : {}),
      ...(extra),
    },
    {
      status,
    }
  );
