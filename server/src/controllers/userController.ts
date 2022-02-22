import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../entities/User";

const register = async (req: Request, res: Response) => {
  const requestBody = req.body as User;
  const { username, password } = requestBody;

  const userWithSameUsername = await User.findOne({ where: { username } });

  if (userWithSameUsername) {
    return res.status(400).json({ error: "Username taken" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: passwordHash }).save();

  return res.json({ user: { id: user.id, username: user.username } });
};

const login = async (req: Request, res: Response) => {
  const requestBody = req.body as User;
  const { username, password } = requestBody;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user.id,
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: 60 * 60 * 24 }
  );

  return res.status(200).send({ token, username: user.username });
};

export default { register, login };
