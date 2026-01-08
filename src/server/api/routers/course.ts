import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const courseApi = createTRPCRouter({
  createCourse: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(20),
        description: z.string().min(3).max(200),
        category: z.enum(["FRONTEND", "BACKEND", "FULLSTACK"]),
        price: z.number(),
        thumbnail: z.string(),
        isPublished: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { category, description, price, thumbnail, title } = input;

        if (!category || !description || !price || !thumbnail || !title) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid input",
          });
        }

        const userId = ctx.session.user.id;
        if (!userId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not found",
          });
        }
        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not register",
          });
        }

        if (user.role !== "CREATOR") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Not a creator",
          });
        }

        const isRegister = ctx.db.Instructor.findUnique({
          where: {
            userId: user.id,
          },
          select: {
            id: true,
          },
        });

        if (!isRegister) {
        }

        const course = await ctx.db.course.create({
          data: {
            category,
            description,
            price,
            thumbnail,
            title,
            creatorId: isRegister.id,
            isPublished,
          },
        });
      } catch (error) {
        throw new TRPCError({
          cause: error,
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create course",
        });
      }
    }),
});
