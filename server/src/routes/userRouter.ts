import express from "express";
import userController from "../controllers/userController";
import auth from "../middleware/auth";
import validateRequest from "../middleware/validateRequest";
import { loginUserSchema, registerUserSchema } from "../validators/userSchemas";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateRequest(registerUserSchema),
  userController.register
);
userRouter.post(
  "/login",
  validateRequest(loginUserSchema),
  userController.login
);
userRouter.get("/me", auth, userController.getCurrentUser);

export default userRouter;
