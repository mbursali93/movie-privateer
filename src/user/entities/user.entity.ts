import {} from '@nestjs/typeorm';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './movies.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @ManyToMany(() => Movie, (movie) => movie.user_id)
  likedMovies: Movie[];
}
