declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    DB_URL_PROD: string;
    DB_URL_DEV: string;
    JWT_SECRET: string;
  }
}

declare namespace Express {
  export interface Request {
    jwt: import("./interfaces/Jwt").default;
  }
}
