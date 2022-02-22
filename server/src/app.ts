import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDb from "./config/connectDb";

void connectDb();

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

app.use("/", (_req: Request, res: Response) => {
  return res.json({ msg: "Hello" });
});

export default app;
