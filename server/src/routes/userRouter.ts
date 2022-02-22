import express from "express";
import userController from "../controllers/userController";
import createUserDto from "../dto/createUserDto";
import validateRequest from "../middleware/validateRequest";

const userRouter = express.Router();

userRouter.get("/", userController.findAll);
userRouter.post("/", validateRequest(createUserDto), userController.create);

export default userRouter;
