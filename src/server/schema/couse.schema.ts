import { z } from "zod";

const categoryEnum = ["FRONTEND", "BACKEND", "FULLSTACK"] as const;

const create = z
  .object({
    title: z.string().min(3, "Title is required").max(20),
    description: z.string().min(3, "Description is required").max(200),
    category: z.enum(categoryEnum),
    price: z.number().min(0, "Price must be positive").finite(),
    thumbnail: z.string().url("Invalid URL"),
    isPublished: z.boolean().default(false),
  })
  .strict();

const search = z.object({
  title: z.string().min(3, "Title is required").max(20),
  category: z.enum(categoryEnum).optional(),
});
const getCourseById = z.object({
  id: z.string().uuid(),
});

const courseSchemas = {
  create,
  search,
  getCourseById,
};

export default courseSchemas;
