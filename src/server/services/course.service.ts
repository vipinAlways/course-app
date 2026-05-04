import type { Session } from "next-auth";
import { courseRepo } from "../repositories/course.repo";
import type { CreateCourseInput } from "../schema/couse.schema";
import { TRPCError } from "@trpc/server";

class Course {
  async createCourse(session: Session, input: CreateCourseInput) {
    const { role, id } = session.user;
    if (role !== "CREATOR") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Not a creator",
      });
    }
    return courseRepo.create(id, input);
  }
}

export const courseService = new Course();
