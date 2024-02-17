import {} from '@nestjs/typeorm';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './movies.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Movie, (movie) => movie.user_id)
  likedMovies: Movie[];
}
