import dotenv from "dotenv";

dotenv.config();

export const IS_PROD = process.env.NODE_ENV === "production";

export const PORT = process.env.PORT ?? 8080;

export const DB_URL = IS_PROD
  ? process.env.DB_URL_PROD
  : process.env.DB_URL_DEV;
