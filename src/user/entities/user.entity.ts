import {} from '@nestjs/typeorm';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './movies.entity';
import { Actor } from './actors.entity';
import { Director } from './directors.entity';
import { genres } from 'src/interfaces/genres';

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
  liked_movies: Movie[];

  @ManyToMany(() => Actor, (actor) => actor.user_id)
  liked_actors: Actor[];

  @ManyToMany(() => Director, (director) => director.user_id)
  liked_directors: Director[];

  @Column('simple-array', { default: genres.map((genre) => [genre, 0]) })
  liked_genres: string[][];
}
