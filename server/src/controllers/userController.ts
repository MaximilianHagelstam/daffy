import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../entities/User";

const findAll = async (_req: Request, res: Response) => {
  const users = await User.find({});
  return res.json({ users });
};

const register = async (req: Request, res: Response) => {
  const requestBody = req.body as User;
  const { username, password } = requestBody;

  const userWithSameUsername = await User.findOne({ where: { username } });

  if (userWithSameUsername) {
    return res.status(400).json({ error: "Username taken" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ username, password: passwordHash }).save();
  return res.json({ user });
};

export default { findAll, register };
