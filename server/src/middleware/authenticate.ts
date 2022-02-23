import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Jwt from "../interfaces/Jwt";

const getRequestToken = (req: Request): string | null => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = getRequestToken(req);
  if (!token) {
    return res.status(401).json({
      error: "missing or invalid token",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.jwt = decoded as Jwt;

  return next();
};

export default authenticate;
