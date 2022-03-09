import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import Like from "../entities/Like";
import ApiError from "../error/ApiError";

const likePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const userId = req.token.id;

    const like = await Like.create({ postId, userId }).save();

    logger.info("Liked post");
    return res.status(201).json({ like });
  } catch (err) {
    return next(
      new ApiError(400, `post with id ${req.params.postId} does not exist`)
    );
  }
};

const unLikePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const userId = req.token.id;

    await Like.delete({ postId, userId });

    logger.info("Unliked post");
    return res.status(204).end();
  } catch (err) {
    return next(
      new ApiError(
        400,
        `user ${req.token.id} has not liked post ${req.params.postId}`
      )
    );
  }
};

export default { likePost, unLikePost };
