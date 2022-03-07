import express from "express";
import likeController from "../controllers/likeController";
import authenticate from "../middleware/authenticate";

const likeRouter = express.Router();

likeRouter.post("/:postId", authenticate, likeController.likePost);
likeRouter.delete("/:postId", authenticate, likeController.unLikePost);

export default likeRouter;
