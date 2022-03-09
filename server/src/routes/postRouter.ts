import express from "express";
import postController from "../controllers/postController";
import auth from "../middleware/auth";
import validateRequest from "../middleware/validateRequest";
import { createPostSchema, getPostsSchema } from "../validators/postSchemas";

const postRouter = express.Router();

postRouter.get("/", validateRequest(getPostsSchema), postController.getAll);
postRouter.post(
  "/",
  auth,
  validateRequest(createPostSchema),
  postController.create
);
postRouter.delete("/:postId", auth, postController.remove);
postRouter.get(
  "/liked",
  auth,
  validateRequest(getPostsSchema),
  postController.getLiked
);

export default postRouter;
