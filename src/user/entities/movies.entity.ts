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

  //   @Index()
  @ManyToMany(() => User, (user) => user.likedMovies)
  user_id: string;

  @Column()
  movie_id: string;
}
