import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieFiltersDto } from '@modules/movie/dto/request/movie-filters.dto';
import { MovieSortDto } from '@modules/movie/dto/request/movie-sort.dto';
import { Movie } from '@domain/movie.entity';

export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findMovies(
    filters?: MovieFiltersDto,
    sort?: MovieSortDto,
    offset?: number,
    limit?: number,
  ): Promise<[Movie[], number]> {
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

    if (offset !== undefined && limit !== undefined) {
      query.skip(offset).take(limit);
    }

    const [movies, total] = await query.getManyAndCount();
    return [movies, total];
  }

  async saveMovie(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async findMovieById(id: number): Promise<Movie> {
    return this.movieRepository.findOne({ where: { id } });
  }

  async remove(movie: Movie): Promise<void> {
    await this.movieRepository.remove(movie);
  }
}
