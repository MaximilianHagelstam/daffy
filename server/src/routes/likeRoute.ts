import express from "express";
import likeController from "../controllers/likeController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import { createAndDeleteLikeSchema } from "../validators/likeSchemas";

const likeRouter = express.Router();

likeRouter.post(
  "/",
  validateRequest(createAndDeleteLikeSchema),
  authenticate,
  likeController.likePost
);
likeRouter.delete(
  "/",
  validateRequest(createAndDeleteLikeSchema),
  authenticate,
  likeController.unLikePost
);

export default likeRouter;
