import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import EmailTemplate from "~/components/EmailTemplate";

import type { VerifyOtpInput } from "../schema/otp.schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail({ email, otp }: VerifyOtpInput) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Hello world",
      react: EmailTemplate({ otp: otp }),
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send email",
      });
    }

    return { success: true, data: Response.json(data) };
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to send email",
      cause:err
    });
  }
}
