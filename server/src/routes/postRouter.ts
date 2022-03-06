import express from "express";
import postController from "../controllers/postController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import {
  createPostSchema,
  paginationSchema,
  removePostSchema,
} from "../validators/postSchemas";

const postRouter = express.Router();

postRouter.get("/", validateRequest(paginationSchema), postController.findAll);
postRouter.post(
  "/",

  validateRequest(createPostSchema),
  authenticate,
  postController.create
);
postRouter.delete(
  "/:postId",

  validateRequest(removePostSchema),
  authenticate,
  postController.remove
);

export default postRouter;
