import { Request, Response } from "express";
import logger from "../config/logger";
import Post from "../entities/Post";
import sortPostsByMostLiked from "../utils/sortPostsByMostLike";

const getAll = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 20;
    const sortBy = req.query.sortBy || "newest";

    let posts: Post[] = [];

    if (sortBy === "newest") {
      posts = await Post.find({
        relations: ["creator", "likes"],
        order: { createdAt: "DESC" },
        take: perPage,
        skip: perPage * (page - 1),
      });
    } else if (sortBy === "oldest") {
      posts = await Post.find({
        relations: ["creator", "likes"],
        order: { createdAt: "ASC" },
        take: perPage,
        skip: perPage * (page - 1),
      });
    } else if (sortBy === "popular") {
      const postsFromDb = await Post.find({
        relations: ["creator", "likes"],
        order: { createdAt: "DESC" },
        take: perPage,
        skip: perPage * (page - 1),
      });
      posts = sortPostsByMostLiked(postsFromDb);
    } else {
      return res.status(400).json({ error: "cant sort by that criteria" });
    }

    logger.info(`Found ${perPage} posts on page ${page} sorted by ${sortBy}`);
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

    const post = await Post.findOne(postId);
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

export default { getAll, create, remove };
