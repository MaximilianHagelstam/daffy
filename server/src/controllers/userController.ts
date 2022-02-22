import { Request, Response } from "express";
import logger from "../config/logger";
import User from "../entities/User";

const findAll = async (_req: Request, res: Response) => {
  const users = await User.find({});
  return res.json({ users });
};

const create = (req: Request, res: Response) => {
  logger.debug(req.body);
  return res.json({ message: "hello" });
};

export default { findAll, create };
