import { object, string } from "yup";

const registerUserSchema = object().shape({
  username: string()
    .required()
    .max(50, "username should be under 50 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "username can only contain alphanumeric characters"
    ),
  password: string()
    .required()
    .min(8, "password should be at least 8 characters")
    .matches(/(?=.*[0-9])/, "password must contain a number"),
});

export default registerUserSchema;
