import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import ApiError from "../error/ApiError";

const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  logger.error(err.message);

  if (err instanceof ApiError) {
    return res.status(err.code).json({ error: err.message });
  }

  return res.status(500).json({ error: "something went wrong" });
};

export default errorHandler;
