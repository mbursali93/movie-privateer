import { Args, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from 'src/models/movie.model';
import { GetMovieDto } from './dtos/get-movie.dto';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => [Movie])
  async getMovies(@Args('getMovieInput') queries: GetMovieDto) {

    return await this.movieService.getMovies(queries);
  }
}
