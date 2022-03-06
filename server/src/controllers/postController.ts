import { Request, Response } from "express";
import logger from "../config/logger";
import Post from "../entities/Post";

const findAll = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 20;

    const posts = await Post.find({
      relations: ["creator"],
      order: { createdAt: "DESC" },
      take: perPage,
      skip: perPage * (page - 1),
    });

    logger.info(`Found ${perPage} on page ${page}`);
    return res.json({ posts });
  } catch (err) {
    logger.error(`Error finding posts: ${err}`);
    return res.status(400).json({ error: "error finding posts" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { body } = req.body as Post;
    const post = await Post.create({ body, creatorId: req.token.id }).save();

    logger.info("Created new post");
    return res.status(201).json({ post });
  } catch (err) {
    logger.error(`Error creating post: ${err}`);
    return res.status(400).json({ error: "error creating post" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.token.id;

    const post = await Post.findOne(userId);
    if (!post) return res.status(400).json({ error: "post does not exist" });

    if (post.creatorId !== userId)
      return res.status(401).json({ error: "unauthorized action" });

    await Post.delete({ id: postId, creatorId: userId });

    logger.info("Deleted post");
    return res.status(204).end();
  } catch (err) {
    logger.error(`Error deleting post: ${err}`);
    return res.status(400).json({ error: "error deleting post" });
  }
};

export default { findAll, create, remove };
