import { Request, Response } from "express";
import User from "../entities/User";

const findAll = async (_req: Request, res: Response) => {
  const users = await User.find({});
  return res.json({ users });
};

export default { findAll };
