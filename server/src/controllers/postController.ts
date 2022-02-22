import { Request, Response } from "express";
import Post from "../entities/Post";

const findAll = async (req: Request, res: Response) => {
  const posts = await Post.find({ where: { creatorId: req.jwt.id } });
  res.json({ posts });
};

const create = async (req: Request, res: Response) => {
  const requestBody = req.body as Post;

  const post = await Post.create({
    body: requestBody.body,
    creatorId: req.jwt.id,
  }).save();
  res.json({ post });
};

export default { findAll, create };
