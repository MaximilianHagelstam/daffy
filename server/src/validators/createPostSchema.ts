import { object, string } from "yup";

const createPostSchema = object().shape({
  body: string()
    .required()
    .min(1, "Post should be 1 character minimum")
    .max(150, "Post should be 150 characters maximum"),
});

export default createPostSchema;
