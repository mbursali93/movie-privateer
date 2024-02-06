import { Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import * as axios from 'axios';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovieDatas() {
    return await this.movieService.getMovies();
    return await this.movieService.getAllMovieDatas();
  }

  @Post()
  async addMovie() {
    // return await this.movieService.addMovie();
  }
}
