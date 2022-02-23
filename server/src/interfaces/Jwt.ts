import { JwtPayload } from "jsonwebtoken";

export default interface Jwt extends JwtPayload {
  id: string;
  username: string;
}
