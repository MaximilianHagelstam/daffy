import express from "express";
import userController from "../controllers/userController";
import loginUserDto from "../dto/loginUserDto";
import registerUserDto from "../dto/registerUserDto";
import validateRequest from "../middleware/validateRequest";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateRequest(registerUserDto),
  userController.register
);
userRouter.post("/login", validateRequest(loginUserDto), userController.login);

export default userRouter;
