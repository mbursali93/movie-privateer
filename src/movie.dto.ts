import { IsInt, IsString, IsDate, IsArray, IsOptional } from 'class-validator';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@ObjectType()
export class MovieDto {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field()
  @IsString()
  imdb_id: string;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  description: string;

  @Field({ nullable: true })
  // @Transform((value) => new Date(value))
  @IsDate()
  release_date: Date;

  @Field()
  @IsString()
  status: string;

  @Field(() => [String])
  @IsArray()
  genres: string[];

  @Field()
  @IsString()
  language: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  collection: string | null;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  posters: string[];

  @Field(() => Int)
  @IsInt()
  runtime: number;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  cast: string[];

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  directors: string[];

  @Field()
  @IsInt()
  popularity: number;
}
