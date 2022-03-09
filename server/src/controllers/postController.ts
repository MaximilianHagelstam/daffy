import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import Like from "../entities/Like";
import Post from "../entities/Post";
import ApiError from "../error/ApiError";
import sortPostsByMostLiked from "../utils/sortPostsByMostLike";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
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
      return next(new ApiError(400, `cant sort by ${sortBy}`));
    }

    logger.info(`Found ${perPage} posts on page ${page} sorted by ${sortBy}`);
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req.body as Post;
    const userId = req.token.id;

    const post = await Post.create({ body, creatorId: userId }).save();

    logger.info("Created new post");
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const userId = req.token.id;

    const post = await Post.findOne(postId);
    if (!post) return next(new ApiError(400, "post does not exist"));

    if (post.creatorId !== userId)
      return next(new ApiError(403, "cant delete another users post"));

    await Post.delete({ id: postId, creatorId: userId });

    logger.info("Deleted post");
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

const getLiked = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 20;
    const userId = req.token.id;

    const likes = await Like.find({
      relations: ["post", "post.creator", "post.likes"],
      take: perPage,
      skip: perPage * (page - 1),
      order: { createdAt: "DESC" },
      where: { userId },
    });

    const posts: Post[] = [];

    for (const like of likes) {
      posts.push(like.post);
    }

    logger.info(`Found ${perPage} liked posts on page ${page}`);
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
};

export default { getAll, create, remove, getLiked };
