import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const StudentCourseApi = createTRPCRouter({
  enrolledCourses: protectedProcedure.
  query(async ({ ctx }) => {
    try {
      const userId = ctx.session.user.id;

      const user = await ctx.db.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not registered",
        });
      }
      const courses = await ctx.db.course.findMany({
        where: {
          isPublished: true,
          enrollments: {
            some: {
              userId: user.id,
            },
          },
        },
      });
      return courses;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        cause: error,
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get enrolled courses",
      });
    }
  }),
  
});
