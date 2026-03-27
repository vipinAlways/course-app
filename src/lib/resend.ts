import { Resend } from "resend";

let resend: Resend | null = null;

export function getResend() {
  if (resend) return resend;

  if (!process.env.RESEND_API_KEY) {
    return null; // ✅ no crash
  }

  resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}