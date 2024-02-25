import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'directors' })
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
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
