import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/object";

const validateRequest =
  (schema: ObjectSchema<AnyObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;

      return next();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }

      return res
        .status(400)
        .json({ error: "Request body does not match the validation schema" });
    }
  };

export default validateRequest;
