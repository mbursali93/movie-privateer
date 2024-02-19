import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => User, (user) => user.liked_movies)
  user_id: string;

  @Column()
  movie_id: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  last_update: Date;
}
