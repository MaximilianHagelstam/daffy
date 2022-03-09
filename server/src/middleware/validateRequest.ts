import { NextFunction, Request, Response } from "express";
import { AnyObject, OptionalObjectSchema } from "yup/lib/object";

type ValidationSchema = OptionalObjectSchema<{
  body?: OptionalObjectSchema<AnyObject>;
  query?: OptionalObjectSchema<AnyObject>;
  params?: OptionalObjectSchema<AnyObject>;
}>;

const validateRequest =
  (schema: ValidationSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }

      return res
        .status(400)
        .json({ error: "request does not match the validation schema" });
    }
  };

export default validateRequest;
