import { Query, Resolver } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from 'src/models/movie.model';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}
  @Query(() => [Movie])
  async getMovies() {
    return await this.movieService.getMovies();
  }
}
