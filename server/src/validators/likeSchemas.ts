import { object, string } from "yup";

export const likeSchema = object({
  params: object({
    postId: string().required(),
  }),
});
