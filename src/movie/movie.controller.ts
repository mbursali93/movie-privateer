import { Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovieDatas() {
    return await this.movieService.getMovieDatas();
  }

  @Post()
  async addMovie() {
    return await this.movieService.addMovie();
  }
}
