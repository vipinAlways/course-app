import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const isBuild =
  process.env.NEXT_PHASE === "phase-production-build";

export const env = createEnv({
  server: {
    AUTH_SECRET: isBuild
      ? z.string().optional()
      : z.string(),

    GOOGLE_CLIENT_ID: isBuild
      ? z.string().optional()
      : z.string(),

    GOOGLE_CLIENT_SECRET: isBuild
      ? z.string().optional()
      : z.string(),

    RESEND_API_KEY: isBuild
      ? z.string().optional()
      : z.string(),

    DATABASE_URL: isBuild
      ? z.string().optional()
      : z.string().url(),

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },

  emptyStringAsUndefined: true,
});
