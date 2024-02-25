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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
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
