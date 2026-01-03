import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import EmailTemplate from "~/components/EmailTemplate";
import { createOtpForEmail } from "~/server/services/otp.service";
import { T } from "node_modules/@upstash/redis/zmscore-0SAuWM0q.mjs";
import { sendOtpEmail } from "~/server/services/mail.service";
import { signIn } from "~/server/auth";

export const authenticate = createTRPCRouter({
  singUp: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      if (!name || !email || !password) {
        throw new TRPCError({
          cause: name || email || password,
          code: "BAD_REQUEST",
          message: "Invalid input",
        });
      }

      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          isVerified: false,
        },
      });

      if (!createdUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
          cause: createdUser,
        });
      }

      const { success } = await createOtpForEmail({ email });

      if (!success) {
        throw new TRPCError({
          cause: success,
          message: "Server : Failed to generate OTP while sign up",
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return {
        success: true,
      };
    }),
  checkOtp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        otp: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, otp } = input;

      if (!email || !otp) {
        throw new TRPCError({
          cause: email || otp,
          code: "BAD_REQUEST",
          message: "Invalid input",
        });
      }

      const latestOtp = await ctx.db.otp.findFirst({
        where: {
          email,
          expireAt: {
            gt: new Date(),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!latestOtp) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "OTP expired or not found",
        });
      }

      const isValid = await bcrypt.compare(otp, latestOtp.otpHash);

      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid OTP",
        });
      }

      await signIn("credentials", {
        email,
        redirect: true,
      });

      const user = await ctx.db.user.update({
        where: {
          email,
        },
        data: {
          emailVerified: new Date(),
          isVerified: true,
        },
      });
      return { success: true };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      if (!email || !password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email and Password are required",
        });
      }

      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user || !user.password) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      const { success } = await createOtpForEmail({ email });

      if (!success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Server : Failed to generate OTP ",
        });
      }

      return { success: true };
    }),
});
