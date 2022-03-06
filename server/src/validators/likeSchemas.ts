import { object, string } from "yup";

export const createLikeSchema = object({
  body: object({
    postId: string().required(),
  }),
});
