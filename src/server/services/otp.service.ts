import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import crypto from "crypto";
import { db } from "../db";
import type { CreateOtpInput } from "../schema/otp.schema";
import { sendOtpEmail } from "./mail.service";
export async function createOtpForEmail({ email }: CreateOtpInput) {
  try {
    if (!email) {
      throw new TRPCError({
        cause: email,
        code: "BAD_REQUEST",
        message: "Invalid input",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await db.otp.create({
      data: {
        email,
        otpHash: hashedOtp,
        expireAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
    const { success: emailSuccess } = await sendOtpEmail({ email, otp: otp });

    if (!emailSuccess) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "server : Failed to send email",
      });
    }
    return { success: true };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Server : issue creating otp",
    });
  }
}
