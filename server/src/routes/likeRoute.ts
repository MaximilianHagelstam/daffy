import express from "express";
import likeController from "../controllers/likeController";
import auth from "../middleware/auth";

const likeRouter = express.Router();

likeRouter.post("/:postId", auth, likeController.likePost);
likeRouter.delete("/:postId", auth, likeController.unLikePost);

export default likeRouter;
