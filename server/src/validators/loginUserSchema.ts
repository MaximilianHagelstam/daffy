import { object, string } from "yup";

const loginUserSchema = object().shape({
  username: string().required(),
  password: string().required(),
});

export default loginUserSchema;
