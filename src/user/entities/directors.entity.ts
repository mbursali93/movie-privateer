import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'directors' })
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.liked_directors)
  user_id: string;

  @Column({ default: 0 })
  like_count: number;

  @Column()
  name: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  last_update: Date;
}
