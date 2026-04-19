import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import type { CourseCard } from "~/types/course";
import courseSchema from "~/server/schema/couse.schema";

export const courseApi = createTRPCRouter({
  create: protectedProcedure
    .input(courseSchema.create)
    .mutation(async ({ ctx, input }) => {
      try {
        const { category, description, price, thumbnail, title, isPublished } =
          input;

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

        if (user.role !== "CREATOR") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Not a creator",
          });
        }

        const isRegister = await ctx.db.instructor.findUnique({
          where: {
            userId,
          },
        });

        if (!isRegister) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Not approve yet",
          });
        }

        const course = await ctx.db.course.create({
          data: {
            category,
            description,
            price,
            thumbnail,
            title,
            instructorId: isRegister.id,
            isPublished,
          },
        });

        return { success: true, courseName: course.title, courseId: course.id };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          cause: error,
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create course",
        });
      }
    }),
  getAllCourse: publicProcedure
    .input(courseSchema.getAll)
    .query(async ({ ctx }) => {
      try {
        const courses = await ctx.db.course.findMany({
          where: {
            isPublished: true,
          },

          orderBy: [{ enrollments: { _count: "asc" } }, { createdAt: "asc" }],
          select: {
            id: true,
            title: true,
            price: true,
            thumbnail: true,
            createdAt: true,
            category: true,
            instructor: {
              select: {
                id: true,
                user: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
            _count: {
              select: {
                enrollments: true,
              },
            },
          },

          take: 30,
        });

        const data = new Map<string, CourseCard[]>();

        for (const course of courses) {
          const category = course.category;

          if (!data.has(category)) {
            data.set(category, []);
          }

          data.get(category)!.push(course);
        }
        return data;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          cause: error,
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to search courses",
        });
      }
    }),
  getById: publicProcedure
    .input(courseSchema.getById)
    .query(async ({ ctx, input }) => {
      try {
        const { id } = input;
        const course = await ctx.db.course.findUnique({
          where: {
            id,
          },
          include: {
            instructor: {
              select: {
                user: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
        });

        if (!course) {
          throw new TRPCError({
            cause: course,
            code: "NOT_FOUND",
            message: "The course do not Exist",
          });
        }
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          cause: error,
          code: "INTERNAL_SERVER_ERROR",
          message: "Server issue Error while finding the data ",
        });
      }
    }),
});
