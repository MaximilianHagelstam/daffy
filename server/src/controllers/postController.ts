import { Request, Response } from "express";
import Post from "../entities/Post";

const findAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 20;

  const posts = await Post.find({
    relations: ["creator"],
    order: { createdAt: "DESC" },
    take: perPage,
    skip: perPage * (page - 1),
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

const remove = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.token.id;

    const post = await Post.findOne(req.params.postId);
    if (!post) return res.status(400).json({ error: "post does not exist" });

    if (post.creatorId !== userId)
      return res.status(401).json({ error: "forbidden action" });

    await Post.delete({ id: postId, creatorId: userId });
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: "post does not exist" });
  }
};

export default { findAll, create, remove };
