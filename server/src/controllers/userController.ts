import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../config/logger";
import User from "../entities/User";
import ApiError from "../error/ApiError";
import getRandomAvatarUrl from "../utils/getRandomAvatarUrl";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body as User;

    const userWithSameUsername = await User.findOne({ where: { username } });
    if (userWithSameUsername) return next(new ApiError(400, "username taken"));

    const passwordHash = await bcrypt.hash(password, 10);
    const avatar = getRandomAvatarUrl();

    const user = await User.create({
      username,
      password: passwordHash,
      avatar,
    }).save();

    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    logger.info(`Created user ${user.username}`);
    return res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    return next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body as User;

    const user = await User.findOne({
      where: { username },
      select: ["id", "username", "password"],
    });
    if (!user) return next(new ApiError(400, "invalid username or password"));

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect)
      return next(new ApiError(400, "invalid username or password"));

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    logger.info(`Logged in user ${user.username}`);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne(req.token.id);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
};

export default { register, login, getCurrentUser };
