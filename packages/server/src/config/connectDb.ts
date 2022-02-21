import mongoose from "mongoose";
import { MONGO_URI } from "./constants";
import logger from "./logger";

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("Connected to database");
  } catch (err) {
    logger.error(`Error connecting to db: ${err}`);
  }
};

export default connectDb;
