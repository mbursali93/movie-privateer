import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import axios from 'axios';
import * as fs from 'fs';
import { MovieDto } from 'src/movie/dtos/movie.dto';
import { GetMovieDto } from './dtos/get-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async getMovies(queries: GetMovieDto = {}) {
    const {
      cast,
      collection,
      description,
      directors,
      genres,
      language,
      limit,
      order = 'desc',
      page,
      release_date,
      runtime,
      sort = 'release_date',
      status,
      title,
    } = queries;

    // const allGenres = [
    //   'Action',
    //   'Adventure',
    //   'Animation',
    //   'Comedy',
    //   'Crime',
    //   'Documentary',
    //   'Drama',
    //   'Family',
    //   'Fantasy',
    //   'History',
    //   'Horror',
    //   'Music',
    //   'Mystery',
    //   'Romance',
    //   'Science Fiction',
    //   'Thriller',
    //   'TV Movie',
    //   'War',
    //   'Western',
    // ];
    // Handle query
    const must = [];

    if (cast)
      must.push({
        match: { cast: { query: cast, fuzziness: 'AUTO', operator: 'and' } },
      });

    if (title) must.push({ match_phrase_prefix: { title } });

    if (description)
      must.push({
        match_phrase_prefix: { description },
      });

    if (language)
      must.push({
        match: { language },
      });

    if (status)
      must.push({
        match: { status },
      });

    if (collection)
      must.push({
        match_phrase_prefix: { collection },
      });

    if (genres) must.push({ terms: { genres } });

    //handle must_not
    // const must_not = [];
    // if (genres) {
    //   must_not.push({
    //     terms: { genres: allGenres.filter((genre) => !genres.includes(genre)) },
    //   });
    // }

    // handle filter

    // handle sort
    const sortQueries = [];
    const sortTarget = {};
    if (sort) {
      sortQueries.push(Object.assign({}, { [sort]: { order } }));
    } else {
      sortQueries.push({ release_date: { order: 'desc' } });
    }

    // // console.log(must);
    // // console.log(genres);
    // console.log(sortTarget)
    console.log(sortQueries);

    const pageNumber = 1;
    const pageSize = 10;

    const movies = await this.elasticsearchService.search({
      index: 'movies',
      body: {
        // size: 10000,
        from: (pageNumber - 1) * pageSize,
        query: {
          bool: {
            must,
            // must_not,
            // filter: [
            //   // { range: { runtime: { gte: 180, lte: 200 } } },
            //   // {
            //   //   range: {
            //   //     release_date: { gte: '1978-01-01', lte: '2000-01-01' },
            //   //   },
            //   // },
            // ],
          },
        },
        sort: sortQueries,
      },
    });
    // console.log(movies.hits.hits.map((hit) => hit._source));
    return movies.hits.hits.map((hit) => hit._source);
  }

  async addMovie(movie: MovieDto) {
    try {
      const indexExists = await this.elasticsearchService.indices.exists({
        index: 'movies',
      });
      if (!indexExists) await this.createMovieIndex();
      return await this.elasticsearchService.index({
        index: 'movies',
        body: movie,
      });
    } catch (err) {
      console.log(err);
    }
  }

  private async createMovieIndex() {
    return await this.elasticsearchService.indices.create({
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

          const elasticsearchService = await axios.get(
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
          } = elasticsearchService.data;

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
