import { Request, Response } from "express";
import Post from "../entities/Post";

const findAll = async (_req: Request, res: Response) => {
  const posts = await Post.find({ relations: ["creator"] });
  res.json({ posts });
};

const create = async (req: Request, res: Response) => {
  const requestBody = req.body as Post;

  const post = await Post.create({
    body: requestBody.body,
    creatorId: req.token.id,
  }).save();

  res.status(201).json({ post });
};

export default { findAll, create };
