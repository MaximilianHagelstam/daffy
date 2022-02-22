declare namespace Express {
  export interface Request {
    jwt: import("../interfaces/Jwt").default;
  }
}
