import express from "express";
import userController from "../controllers/userController";
import createUserDto from "../dto/createUserDto";
import validateRequest from "../middleware/validateRequest";

const userRouter = express.Router();

userRouter.get("/", userController.findAll);
userRouter.post(
  "/register",
  validateRequest(createUserDto),
  userController.register
);

export default userRouter;
