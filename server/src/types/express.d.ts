interface Jwt {
  id: string;
}

declare namespace Express {
  export interface Request {
    jwt: Jwt;
  }
}
