import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface RecaptchaBody {
  token: string;
}

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export async function POST(request: NextRequest) {
  const { token } = (await request.json()) as RecaptchaBody;

  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error: "Server misconfiguration: missing reCAPTCHA secret.",
        success: false,
      },
      { status: 500 }
    );
  }

  try {
    const url = `https://www.google.com/recaptcha/api/siteverify`;
    const params = new URLSearchParams({ secret: secretKey, response: token });

    const { data } = await axios.post<RecaptchaResponse>(url, params);

    if (data.success) {
      return NextResponse.json(
        {
          message: "Captcha verification success!",
          success: true,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        error: "Captcha verification failed!",
        success: false,
      },
      { status: 400 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("reCAPTCHA API error:", error.message);

    return NextResponse.json(
      {
        error: "Captcha verification failed!",
        success: false,
      },
      { status: 500 }
    );
  }
}
