import express from "express";
import postController from "../controllers/postController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import { createPostSchema, getPostsSchema } from "../validators/postSchemas";

const postRouter = express.Router();

postRouter.get("/", validateRequest(getPostsSchema), postController.getAll);
postRouter.post(
  "/",
  authenticate,
  validateRequest(createPostSchema),
  postController.create
);
postRouter.delete("/:postId", authenticate, postController.remove);
postRouter.get(
  "/liked",
  authenticate,
  validateRequest(getPostsSchema),
  postController.getLiked
);

export default postRouter;
