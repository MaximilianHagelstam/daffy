import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity({ name: "likes" })
class Like extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @PrimaryColumn()
  postId: string;

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: "CASCADE",
  })
  post: Post;
}

export default Like;
