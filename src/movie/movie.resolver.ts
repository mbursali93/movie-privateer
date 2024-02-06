import { Query, Resolver } from '@nestjs/graphql';
import { MovieDto } from 'src/movie.dto';
import { MovieService } from './movie.service';

@Resolver(() => MovieDto)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}
  @Query(() => [MovieDto])
  async getMovies() {
    return await this.movieService.getMovies();
  }
}
