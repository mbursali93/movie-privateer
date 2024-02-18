import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'actors' })
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  actor_name: string;

  @Column({ default: 0 })
  like_count: number;

  @ManyToMany(() => User, (user) => user.liked_actors)
  user_id: string;
}
