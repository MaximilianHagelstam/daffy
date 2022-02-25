import express from "express";
import userController from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import loginUserSchema from "../validators/loginUserSchema";
import registerUserSchema from "../validators/registerUserSchema";

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
userRouter.get("/current", authenticate, userController.getCurrentUser);

export default userRouter;
