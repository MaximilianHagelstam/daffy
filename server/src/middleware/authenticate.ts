import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Jwt {
  id: string;
}

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
      error: "Missing token",
    });
  }

  const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
  if (!decoded) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  req.jwt = decoded as Jwt;
  return next();
};

export default authenticate;
