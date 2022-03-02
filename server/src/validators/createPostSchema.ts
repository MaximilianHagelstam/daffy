import { object, string } from "yup";

const createPostSchema = object({
  body: object({
    body: string().max(150).required(),
  }),
});

export default createPostSchema;
