import { number, object } from "yup";

const paginationSchema = object({
  query: object({
    page: number().min(1).default(1),
    perPage: number().min(1).max(100).default(20),
  }),
});

export default paginationSchema;
