import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  imdb_id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  release_date: string;

  @Field(() => String)
  status: string;

  @Field(() => [String])
  genres: string[];

  @Field(() => String)
  language: string;

  @Field(() => String, { nullable: true })
  collection: string | null;

  @Field(() => [String])
  posters: string[];

  @Field(() => Int)
  runtime: number;

  @Field(() => [String])
  cast: string[];

  @Field(() => [String])
  directors: string[];

  @Field(() => Float)
  popularity: number;
}
