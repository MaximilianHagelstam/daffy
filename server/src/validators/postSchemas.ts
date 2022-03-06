import { number, object, string } from "yup";

export const createPostSchema = object({
  body: object({
    body: string().max(150).required(),
  }),
});

export const paginationSchema = object({
  query: object({
    page: number().min(1).default(1),
    perPage: number().min(1).max(100).default(20),
  }),
});
