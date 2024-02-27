import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'genres' })
export class Genre {
  @PrimaryColumn()
  user_id: string;

  @Column({ default: 0 })
  action: number;

  @Column({ default: 0 })
  adventure: number;

  @Column({ default: 0 })
  animation: number;

  @Column({ default: 0 })
  comedy: number;

  @Column({ default: 0 })
  crime: number;

  @Column({ default: 0 })
  documentary: number;

  @Column({ default: 0 })
  drama: number;

  @Column({ default: 0 })
  family: number;

  @Column({ default: 0 })
  fantasy: number;

  @Column({ default: 0 })
  history: number;

  @Column({ default: 0 })
  horror: number;

  @Column({ default: 0 })
  music: number;

  @Column({ default: 0 })
  mystery: number;

  @Column({ default: 0 })
  romance: number;

  @Column({ default: 0 })
  science_fiction: number;

  @Column({ default: 0 })
  thriller: number;

  @Column({ default: 0 })
  tv_movie: number;

  @Column({ default: 0 })
  war: number;

  @Column({ default: 0 })
  western: number;
}
