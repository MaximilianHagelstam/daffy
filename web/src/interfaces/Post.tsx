import User from "./User";

export default interface Post {
  id: string;
  body: string;
  creatorId: string;
  creator: User;
  createdAt: string;
  updatedAt: string;
}
