import dotenv from "dotenv";

dotenv.config();

export const IS_PROD = process.env.NODE_ENV === "production";

export const PORT = process.env.PORT ?? 8080;

export const MONGO_URI = IS_PROD
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;
