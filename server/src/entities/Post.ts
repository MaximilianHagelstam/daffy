import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  body: string;

  @Column()
  creatorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
