import { Request, Response } from "express";
import Like from "../entities/Like";
import Post from "../entities/Post";

const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne(req.params.postId);
    if (!post) return res.status(400).json({ error: "post does not exist" });

    await Like.create({
      postId: req.params.postId,
      userId: req.token.id,
    }).save();
    return res.status(201).json({ message: "liked post" });
  } catch (error) {
    return res.status(400).json({ error: "can not like post" });
  }
};

const unLikePost = async (req: Request, res: Response) => {
  try {
    await Like.delete({ postId: req.params.postId, userId: req.token.id });
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: "can not unlike post" });
  }
};

const getLikeAmount = async (req: Request, res: Response) => {
  try {
    const likes = await Like.find({
      where: { postId: req.params.postId },
    });
    return res.json({ like_amount: likes.length });
  } catch (err) {
    return res.status(400).json({ error: "can not find post" });
  }
};

const checkIfLiked = async (req: Request, res: Response) => {
  try {
    const like = await Like.findOne({
      where: { postId: req.params.postId, userId: req.token.id },
    });

    if (like) return res.json({ liked: true });
    return res.json({ liked: false });
  } catch (err) {
    return res.status(400).json({ error: "can not check if liked" });
  }
};

export default { likePost, unLikePost, getLikeAmount, checkIfLiked };
