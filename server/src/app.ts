import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import "reflect-metadata";
import connectDb from "./config/connectDb";
import postRouter from "./routes/postRouter";
import userRouter from "./routes/userRouter";

void connectDb();

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export default app;
