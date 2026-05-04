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

const getById = z.object({
  id: z.string().uuid(),
});
export type CreateCourseInput = z.infer<typeof create>;
const getAll = z.object({
  search: z.string().max(100, "Search query is too long").optional(),
  limit: z.number().min(1).max(100).default(20).optional(),
});

const courseSchemas = {
  create,
  getAll,
  getById,
};

export default courseSchemas;
