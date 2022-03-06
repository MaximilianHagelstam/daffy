import express from "express";
import likeController from "../controllers/likeController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import { createLikeSchema } from "../validators/likeSchemas";

const likeRouter = express.Router();

likeRouter.post(
  "/",

  validateRequest(createLikeSchema),
  authenticate,
  likeController.likePost
);

export default likeRouter;
