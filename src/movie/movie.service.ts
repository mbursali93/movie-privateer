import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import axios from 'axios';
import * as fs from 'fs';
import { MovieDto } from 'src/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly movieData: ElasticsearchService) {}

  async addMovie(movie: MovieDto) {
    try {
      const indexExists = await this.movieData.indices.exists({
        index: 'movies',
      });
      if (!indexExists) await this.createMovieIndex();
      return await this.movieData.index({
        index: 'movies',
        body: movie,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async createMovieIndex() {
    return await this.movieData.indices.create({
      index: 'movies',
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            imdb_id: { type: 'keyword' },
            title: { type: 'text' },
            description: { type: 'text' },
            release_date: { type: 'date' },
            status: { type: 'keyword' },
            genres: { type: 'keyword' },
            language: { type: 'keyword' },
            collection: { type: 'text' },
            posters: { type: 'keyword' },
            runtime: { type: 'integer' },
            cast: { type: 'text' },
            directors: { type: 'text' },
            popularity: { type: 'double' },
          },
        },
        settings: {
          index: {
            number_of_shards: 1,
            number_of_replicas: 1,
          },
        },
      },
    });
  }

  async getAllMovieDatas() {
    const movieIds = [];
    fs.readFile('movie_ids.json', 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return;
      }

      const lines: string[] = data.trim().split('\n');

      for (let i = 0; i < 49999; i++) {
        try {
          const movie = JSON.parse(lines[i]);
          const movieId: number = movie.id;

          const movieData = await axios.get(
            `${process.env.TMDB_BASE_URL}/${movieId}?api_key=${process.env.TMDB_API_KEY}`,
          );

          const movieCredits = await axios.get(
            `${process.env.TMDB_BASE_URL}/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}`,
          );

          const {
            id,
            imdb_id,
            belongs_to_collection,
            genres,
            original_language,
            original_title,
            overview,
            release_date,
            runtime,
            status,
            popularity,
            poster_path,
            backdrop_path,
          } = movieData.data;

          const { cast, crew } = movieCredits.data;

          const movieCast = cast.map((data) => {
            return data.name;
          });

          const collection = belongs_to_collection
            ? belongs_to_collection.name
            : null;

          const directors = crew
            .filter((data) => {
              return data.known_for_department == 'Directing';
            })
            .map((data) => {
              return data.name;
            });

          const movieGenres = genres.map((data) => {
            return data.name;
          });

          await this.addMovie({
            id,
            imdb_id,
            language: original_language,
            title: original_title,
            description: overview,
            runtime,
            cast: movieCast,
            directors,
            status,
            collection,
            popularity,
            genres: movieGenres,
            release_date: new Date(release_date),
            posters: [
              `${process.env.TMDB_IMAGE}` + poster_path,
              `${process.env.TMDB_IMAGE}` + backdrop_path,
            ],
          });
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });
  }
}
