import express from "express";
import postController from "../controllers/postController";
import createPostDto from "../dto/createPostDto";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";

const postRouter = express.Router();

postRouter.get("/", authenticate, postController.findAll);
postRouter.post(
  "/",
  authenticate,
  validateRequest(createPostDto),
  postController.create
);

export default postRouter;
