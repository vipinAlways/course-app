
import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});



export const createOtpSchema = z.object({
    email: z.string().email(),
});


export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type CreateOtpInput = z.infer<typeof createOtpSchema>;
