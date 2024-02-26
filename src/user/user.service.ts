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
      console.log(user_id);

      // Handle Movies
      const movieLiked = await this.movieRepository.findOneBy({
        //exists?
        user_id,
        movie_id,
      });

      if (movieLiked)
        throw new BadRequestException('You already liked that movie before');

      const likedMovie = this.movieRepository.create({ user_id, movie_id });
      // user.liked_movies.push(likedMovie);

      // Handle Directors
      const directors = new Set(movie.directors);

      for (const director of directors) {
        const directorLikedBefore = await this.directorRepository.findOneBy({
          name: director,
          // user_id,
        });

        if (directorLikedBefore) {
          directorLikedBefore.like_count++;
          await this.directorRepository.save(directorLikedBefore);
        } else {
          const newDirector = await this.directorRepository.create({
            name: director,
            like_count: 1,
            user_id,
          });

          await this.directorRepository.save(newDirector);
          // user.liked_directors.push(newDirector);
        }
      }

      // Handle Cast

      for (let i = 0; i < 5; i++) {
        const actor = movie.cast[i];
        const actorLikedBefore = await this.actorRepository.findOneBy({
          actor_name: actor,
          user_id,
        });

        if (actorLikedBefore) {
          actorLikedBefore.like_count++;
          await this.actorRepository.save(actorLikedBefore);
        } else {
          const likedActor = await this.actorRepository.create({
            actor_name: actor,
            user_id,
            like_count: 1,
          });

          await this.actorRepository.save(likedActor);
        }
      }

      // Handle Genres

      // return user;
      // await this.userRepository.save(user);

      return movie;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  }

  async dislikeMovie(user_id, movie_id) {
    return 'movie disliked';
  }
}
