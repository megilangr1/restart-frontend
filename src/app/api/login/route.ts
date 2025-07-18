// app/api/login/route.ts
import { MainRes } from "@/lib/types/api-response";
import { SLoginResult } from "@/lib/types/server/server-response";
import { cookies } from "next/headers";
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
    if (!data.success) {
      return NextResponse.json(data, { status: response.status });
    }

    const {
      result: { access_token, refresh_token, user },
    } = data;

    const cookieStore = await cookies();
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      maxAge: 60 * 15,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    return NextResponse.json(
      {
        ...data,
        result: {
          user: user,
        },
      },
      { status: response.status }
    );
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
