import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Like } from "./Like";
import User from "./User";

@Entity({ name: "posts" })
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  body: string;

  @Column()
  creatorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
