import { IsInt, IsString, IsDate, IsArray, IsOptional } from 'class-validator';

export class MovieDto {
  @IsInt()
  id: number;

  @IsString()
  imdb_id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  release_date: Date;

  @IsString()
  status: string;

  @IsArray()
  genres: string[];

  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  collection: string | null;

  @IsArray()
  @IsString({ each: true })
  posters: string[];

  @IsInt()
  runtime: number;

  @IsArray()
  @IsString({ each: true })
  cast: string[];

  @IsArray()
  @IsString({ each: true })
  directors: string[];

  @IsInt()
  popularity: number;
}
