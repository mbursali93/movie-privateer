import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => Int)
  id: number;

  @Field()
  imdb_id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  release_date: string;

  @Field()
  status: string;

  @Field(() => [String])
  genres: string[];

  @Field()
  language: string;

  @Field({ nullable: true })
  collection: string | null;

  @Field(() => [String])
  posters: string[];

  @Field(() => Int)
  runtime: number;

  @Field(() => [String])
  cast: string[];

  @Field(() => [String])
  directors: string[];

  @Field()
  popularity: number;
}
