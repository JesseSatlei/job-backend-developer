import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../../domain/movie.entity';
import { MovieFiltersDto } from '@/modules/movie/dto/movie-filters.dto';
import { MovieSortDto } from '@/modules/movie/dto/movie-sort.dto';

export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findMovies(
    filters?: MovieFiltersDto,
    sort?: MovieSortDto,
  ): Promise<Movie[]> {
    const query = this.movieRepository.createQueryBuilder('movie');

    if (filters?.title) {
      query.andWhere('movie.title LIKE :title', {
        title: `%${filters.title}%`,
      });
    }
    if (filters?.actors) {
      query.andWhere('movie.actors LIKE :actors', {
        actors: `%${filters.actors}%`,
      });
    }
    if (filters?.director) {
      query.andWhere('movie.director LIKE :director', {
        director: `%${filters.director}%`,
      });
    }

    if (sort?.field) {
      query.orderBy(`movie.${sort.field}`, sort.order);
    }

    return query.getMany();
  }

  async saveMovie(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }
}
