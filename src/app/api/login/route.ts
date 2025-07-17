// app/api/login/route.ts
import { MainRes } from "@/lib/types/api-response";
import { SLoginResult } from "@/lib/types/server/server-response";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: MainRes<SLoginResult> = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    const fallback: MainRes<null> = {
      success: false,
      code: "CLIENT500",
      message: "Tidak dapat menghubungi server",
      result: null,
    };

    return NextResponse.json(fallback, { status: 500 });
  }
}
