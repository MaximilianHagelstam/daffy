import { object, string } from "yup";

const registerUserSchema = object().shape({
  username: string()
    .required()
    .min(1, "Username must be 1 character minimum")
    .max(50, "Username should be 50 characters maximum")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username can only contain alphanumeric characters"
    ),
  password: string()
    .required()
    .min(8, "Password should be 8 characters minimum")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
});

export default registerUserSchema;
