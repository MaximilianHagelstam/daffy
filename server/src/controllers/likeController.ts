import { Request, Response } from "express";
import logger from "../config/logger";
import Like from "../entities/Like";
import Post from "../entities/Post";

const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne(req.params.postId);
    if (!post) return res.status(400).json({ error: "post does not exist" });

    const like = await Like.create({
      postId: req.params.postId,
      userId: req.token.id,
    }).save();

    logger.info("Liked post");
    return res.status(201).json({ like });
  } catch (err) {
    logger.error(`Error liking post: ${err}`);
    return res.status(400).json({ error: "error liking post" });
  }
};

const unLikePost = async (req: Request, res: Response) => {
  try {
    await Like.delete({ postId: req.params.postId, userId: req.token.id });

    logger.info("Unliked post");
    return res.status(204).end();
  } catch (err) {
    logger.error(`Error unliking post: ${err}`);
    return res.status(400).json({ error: "error unliking post" });
  }
};

export default { likePost, unLikePost };
