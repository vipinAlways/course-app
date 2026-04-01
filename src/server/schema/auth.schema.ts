import { z } from "zod";

const signUp = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

const otp = z.object({
  email: z.string(),
  otp: z.string(),
});

const signIn = z.object({
  email: z.string(),
  password: z.string(),
});

const authSchema = {
  signUp,
  otp,
  signIn
};

export default authSchema;
