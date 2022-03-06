import Like from "./Like";
import User from "./User";

export default interface Post {
  id: string;
  body: string;
  creatorId: string;
  creator: User;
  likes?: Like[];
  createdAt: string;
  updatedAt: string;
}
