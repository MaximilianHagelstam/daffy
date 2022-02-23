import { object, string } from "yup";

const createPostSchema = object().shape({
  body: string()
    .required()
    .max(150, "post body should be under 150 characters"),
});

export default createPostSchema;
