import { db } from "../db";
import type { CreateCourseInput } from "../schema/couse.schema";

class Course {
  async create(creatorId:string,input: CreateCourseInput) {
    return await db.course.create({
      data: {...input, instructorId: creatorId},
    });
  }
}

export const courseRepo = new Course();
