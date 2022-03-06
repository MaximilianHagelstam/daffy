import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity({ name: "likes" })
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: "CASCADE",
  })
  post: Post;
}
