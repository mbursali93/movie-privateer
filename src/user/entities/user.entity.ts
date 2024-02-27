import {} from '@nestjs/typeorm';
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
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
}
