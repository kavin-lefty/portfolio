import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      success: true,
      message: 'hle!',
      data: {
        message: 'Message and email sent successfully!',
      },
    },
    { status: 200 }
  );
}
