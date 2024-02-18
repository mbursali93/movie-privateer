import {} from '@nestjs/typeorm';
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './movies.entity';
import { Actor } from './actors.entity';
import { Director } from './directors.entity';

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

  @Column()
  liked_categories: string[][];
}
