import { Request, Response } from "express";
import Like from "../entities/Like";
import Post from "../entities/Post";

const likePost = async (req: Request, res: Response) => {
  try {
    const requestBody = req.body as Like;

    const post = await Post.findOne(requestBody.postId);
    if (!post) return res.status(400).json({ error: "post does not exist" });

    await Like.create({
      postId: requestBody.postId,
      userId: req.token.id,
    }).save();
    return res.status(201).json({ message: "liked post" });
  } catch (error) {
    return res.status(400).json({ error: "can not like post" });
  }
};

export default { likePost };
