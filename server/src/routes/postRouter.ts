import express from "express";
import postController from "../controllers/postController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import createPostSchema from "../validators/createPostSchema";
import paginationSchema from "../validators/paginationSchema";

const postRouter = express.Router();

postRouter.get("/", validateRequest(paginationSchema), postController.findAll);
postRouter.post(
  "/",

  validateRequest(createPostSchema),
  authenticate,
  postController.create
);

export default postRouter;
