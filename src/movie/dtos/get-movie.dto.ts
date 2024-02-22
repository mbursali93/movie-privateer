import { Field, InputType, Int } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@InputType()
@Entity()
export class GetMovieDto {
  @Field({ nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  release_date?: string;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field(() => String, { nullable: true })
  language?: string;

  @Field(() => String, { nullable: true })
  collection?: string | null;

  @Field(() => Int, { nullable: true })
  runtime?: number;

  @Field(() => [String], { nullable: true })
  cast?: string[];

  @Field(() => [String], { nullable: true })
  directors?: string[];

  @Field(() => String, { nullable: true })
  sort?: string;

  @Field(() => String, { nullable: true })
  order?: string;

  @Field(() => String, { nullable: true })
  page?: string;

  @Field(() => String, { nullable: true })
  limit?: string;
}
