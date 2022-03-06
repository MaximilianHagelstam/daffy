import express from "express";
import likeController from "../controllers/likeController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import { likeSchema } from "../validators/likeSchemas";

const likeRouter = express.Router();

likeRouter.post(
  "/:postId",
  validateRequest(likeSchema),
  authenticate,
  likeController.likePost
);
likeRouter.delete(
  "/:postId",
  validateRequest(likeSchema),
  authenticate,
  likeController.unLikePost
);
likeRouter.get(
  "/amount/:postId",
  validateRequest(likeSchema),
  likeController.getLikeAmount
);
likeRouter.get(
  "/check/:postId",
  authenticate,
  validateRequest(likeSchema),
  likeController.checkIfLiked
);

export default likeRouter;
