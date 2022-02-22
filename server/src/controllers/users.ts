import express, { Request, Response } from "express";
import User from "../entities/User";

const userRouter = express.Router();

userRouter.get("/", async (_req: Request, res: Response) => {
  const users = await User.find({});
  return res.json({ users });
});

export default userRouter;
