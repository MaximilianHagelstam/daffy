import express from "express";
import postController from "../controllers/postController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import { createPostSchema, paginationSchema } from "../validators/postSchemas";

const postRouter = express.Router();

postRouter.get("/", validateRequest(paginationSchema), postController.getAll);
postRouter.post(
  "/",
  authenticate,
  validateRequest(createPostSchema),
  postController.create
);
postRouter.delete("/:postId", authenticate, postController.remove);

export default postRouter;
