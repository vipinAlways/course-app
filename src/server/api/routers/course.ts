import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import courseSchema from "~/server/schema/couse.schema";
import type { CourseCategory, Prisma } from "generated/prisma/client";
import { courseService } from "~/server/services/course.service";

export const courseApi = createTRPCRouter({
  create: protectedProcedure
    .input(courseSchema.create)
    .mutation(async ({ ctx, input }) => {
      try {
        const course = await courseService.createCourse(ctx.session, input);

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
  getAll: publicProcedure
    .input(courseSchema.getAll)
    .query(async ({ ctx, input }) => {
      try {
        const search = input.search?.trim();

        const where: Prisma.CourseWhereInput = {
          isPublished: true,
        };
        const categoryMap: Record<string, CourseCategory> = {
          frontend: "FRONTEND",
          backend: "BACKEND",
          fullstack: "FULLSTACK",
        };

        if (search) {
          const normalized = search.toLowerCase();

          const matchedCategory = categoryMap[normalized];

          where.OR = [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              instructor: {
                user: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            },
            ...(matchedCategory
              ? [
                  {
                    category: matchedCategory,
                  },
                ]
              : []),
          ];
        }

        const courses = await ctx.db.course.findMany({
          where,
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

        return courses;
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
