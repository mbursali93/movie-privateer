import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoogleProfile } from 'src/interfaces/profile.google';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Movie } from './entities/movies.entity';
import { MovieDto } from 'src/movie/dtos/movie.dto';
import { Director } from './entities/directors.entity';
import { Actor } from './entities/actors.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}
  async getUserProfile() {
    return 'user';
  }

  async validateUser(profile: IGoogleProfile) {
    const { email } = profile;
    const user = await this.userRepository.findOneBy({ email });
    if (user) return user;

    const savedUser = await this.userRepository.create(profile);
    return await this.userRepository.save(savedUser);
  }

  async likeMovie(user_id, movie_id) {
    try {
      const data = await this.elasticsearchService.search({
        index: 'movies',
        body: {
          query: { match: { id: movie_id } }, // TODO: add status
        },
      });

      const movie =
        data.hits.hits.length > 0
          ? (data.hits.hits[0]._source as MovieDto)
          : null;
      if (!movie) throw new NotFoundException('No movies found.');

      const user = await this.userRepository.findOneBy({ id: user_id });

      // Handle Movies
      const movieLiked = await this.movieRepository.findOneBy({
        //exists?
        user_id,
        movie_id,
      });

      if (movieLiked)
        throw new BadRequestException('You already liked that movie before');

      const likedMovie = this.movieRepository.create({ user_id, movie_id }); //pushlucaz mı, direkt save yeter mi
      user.liked_movies.push(likedMovie);

      // Handle Directors
      const directors = new Set(movie.directors);
      for (const director in directors) {
        console.log(director);
        const directorLikedBefore = await this.directorRepository.findOneBy({
          name: director,
        });
        
      }

      // Handle Cast

      // Handle Genres

      // return user;

      return movie;
    } catch (err) {
      return err.response;
    }
  }

  async dislikeMovie(user_id, movie_id) {
    return 'movie disliked';
  }
}
