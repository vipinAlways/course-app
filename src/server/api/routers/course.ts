import z, { optional } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const courseApi = createTRPCRouter({
  createCourse: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3, "Title is required").max(20),
        description: z.string().min(3, "Description is required").max(200),
        category: z.enum(["FRONTEND", "BACKEND", "FULLSTACK"]),
        price: z.number().min(0, "Price must be positive").finite(),
        thumbnail: z.string().url("Invalid URL"),
        isPublished: z.boolean().default(false),
      }),
    )
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
          select: {
            id: true,
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
  courseSearch: publicProcedure
    .input(
      z.object({
        title: z.string().trim().optional(),
        category: z.enum(["FRONTEND", "BACKEND", "FULLSTACK"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { title, category } = input;
        const courses = await ctx.db.course.findMany({
          where: {
            ...(title
              ? {
                  title: {
                    contains: title,
                    mode: "insensitive",
                  },
                }
              : {}),
            ...(category
              ? {
                  category: {
                    equals: category,
                  },
                }
              : {}),
            isPublished: true,
          },
          orderBy: [{ enrollments: { _count: "desc" } }, { createdAt: "desc" }],
          include: {
            _count: {
              select: { enrollments: true },
            },
          },
          take: 6,
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
  getAllCourse: publicProcedure.query(async ({ ctx, input }) => {
    try {
      const courses = await ctx.db.course.findMany({
        where: {
          isPublished: true,
        },

        orderBy: [{ enrollments: { _count: "desc" } }, { createdAt: "desc" }],
        include: {
          _count: {
            select: { enrollments: true },
          },
        },
        take: 30,
      });

      const data = new Map();

      for (let i = 0; i < courses.length; i++) {
        const category = courses[i]?.category;

        if (!data.has(category!)) {
          data.set(category!, []);
        }

        data.get(category!)!.push(courses[i]);
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
});
