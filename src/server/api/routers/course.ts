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

        const user = ctx.session.user.id;

        if (!user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not found",
          });
        }
        const course = await ctx.db.course.create({
          data: {
            category,
            description,
            price,
            thumbnail,
            title,
            creatorId: user,
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
