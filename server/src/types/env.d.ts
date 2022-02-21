declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    MONGO_URI_PROD: string;
    MONGO_URI_DEV: string;
  }
}
