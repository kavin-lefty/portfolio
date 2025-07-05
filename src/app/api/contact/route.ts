
import axios from "axios";
import nodemailer, { Transporter } from "nodemailer";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface MessagePayload {
  name: string;
  email: string;
  message: string;
}

interface Env {
  EMAIL_ADDRESS: string;
  GMAIL_PASSKEY: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

function getEnv(): Env {
  const { EMAIL_ADDRESS, GMAIL_PASSKEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } =
    process.env;

  if (
    !EMAIL_ADDRESS ||
    !GMAIL_PASSKEY ||
    !TELEGRAM_BOT_TOKEN ||
    !TELEGRAM_CHAT_ID
  ) {
    throw new Error("One or more required environment variables are missing.");
  }

  return {
    EMAIL_ADDRESS,
    GMAIL_PASSKEY,
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
  };
}

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string
): Promise<boolean> {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await axios.post<{ ok: boolean }>(url, {
      text,
      chat_id: chatId,
    });
    return res.data.ok;
  } catch (err: unknown) {
    const error = err as Error & { response?: { data?: unknown } };
    /* eslint-disable no-console */
    console.error(
      "Error sending Telegram message:",
      error.response?.data ?? error.message
    );
    return false;
  }
}

const emailTemplate = (
  name: string,
  email: string,
  userMessage: string
): string => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

async function sendEmail(
  env: Env,
  { name, email, message: userMessage }: MessagePayload
): Promise<boolean> {
  const mailOptions = {
    from: "Portfolio",
    to: env.EMAIL_ADDRESS,
    subject: `New Message From ${name}`,
    text: userMessage,
    html: emailTemplate(name, email, userMessage),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error while sending email:", error.message);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as MessagePayload;
    const env = getEnv();

    const { name, email, message: userMessage } = payload;
    const formatted = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send notifications in parallel
    const [telegramOk, emailOk] = await Promise.all([
      sendTelegramMessage(
        env.TELEGRAM_BOT_TOKEN,
        env.TELEGRAM_CHAT_ID,
        formatted
      ),
      sendEmail(env, payload),
    ]);

    if (telegramOk && emailOk) {
      return NextResponse.json(
        { success: true, message: "Message and email sent successfully!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to send message or email." },
      { status: 500 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error("API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error occurred." },
      { status: 500 }
    );
  }
}
