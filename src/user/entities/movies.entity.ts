import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.liked_movies)
  user_id: string;

  @Column()
  movie_id: string;
}
