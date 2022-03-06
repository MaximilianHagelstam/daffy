import { object, string } from "yup";

export const createAndDeleteLikeSchema = object({
  body: object({
    postId: string().required(),
  }),
});
