import express from "express";
import postController from "../controllers/postController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import createPostSchema from "../validators/createPostSchema";

const postRouter = express.Router();

postRouter.get("/", authenticate, postController.findAll);
postRouter.post(
  "/",
  authenticate,
  validateRequest(createPostSchema),
  postController.create
);

export default postRouter;
