import { object, string } from "yup";

export const loginUserSchema = object({
  body: object({
    username: string().required(),
    password: string().required(),
  }),
});

export const registerUserSchema = object({
  body: object({
    username: string()
      .required()
      .max(50)
      .matches(/^[a-zA-Z0-9]+$/, "can only contain alphanumeric characters"),
    password: string()
      .required()
      .min(8)
      .matches(/(?=.*[0-9])/, "must contain a number"),
  }),
});
