import { Request, Response } from "express";
import Post from "../entities/Post";

const findAll = async (req: Request, res: Response) => {
  const limit: number = Number(req.query.limit) || 20;

  const posts = await Post.find({
    relations: ["creator"],
    order: { createdAt: "DESC" },
    take: limit,
  });
  return res.json({ posts });
};

const create = async (req: Request, res: Response) => {
  const requestBody = req.body as Post;

  const post = await Post.create({
    body: requestBody.body,
    creatorId: req.token.id,
  }).save();

  return res.status(201).json({ post });
};

export default { findAll, create };
