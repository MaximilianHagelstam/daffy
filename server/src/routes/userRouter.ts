import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userController.findAll);

export default userRouter;
