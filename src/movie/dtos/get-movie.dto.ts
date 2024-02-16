import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetMovieDto {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  release_date?: string;

  @Field({ nullable: true })
  status?: string;

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field({ nullable: true })
  language?: string;

  @Field({ nullable: true })
  collection?: string | null;

  @Field({ nullable: true })
  runtime?: number;

  @Field(() => [String], { nullable: true })
  cast?: string[];

  @Field(() => [String], { nullable: true })
  directors?: string[];

  @Field({ nullable: true })
  sort?: string;

  @Field({ nullable: true })
  order?: string;

  @Field({ nullable: true })
  page?: string;

  @Field({ nullable: true })
  limit?: string;
}
