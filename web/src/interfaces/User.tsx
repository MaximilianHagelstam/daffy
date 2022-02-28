import Post from "./Post";

export default interface User {
  id: string;
  username: string;
  avatar: string;
  posts?: Post[];
  createdAt: string;
  updatedAt: string;
}
