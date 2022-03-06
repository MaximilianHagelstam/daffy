import express from "express";
import postController from "../controllers/postController";
import authenticate from "../middleware/authenticate";
import validateRequest from "../middleware/validateRequest";
import { createPostSchema, paginationSchema } from "../validators/postSchemas";

const postRouter = express.Router();

postRouter.get("/", validateRequest(paginationSchema), postController.findAll);
postRouter.post(
  "/",

  validateRequest(createPostSchema),
  authenticate,
  postController.create
);

export default postRouter;
