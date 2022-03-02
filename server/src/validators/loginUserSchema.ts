import { object, string } from "yup";

const loginUserSchema = object({
  body: object({
    username: string().required(),
    password: string().required(),
  }),
});

export default loginUserSchema;
