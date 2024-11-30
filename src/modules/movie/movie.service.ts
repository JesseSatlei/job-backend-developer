import { Injectable } from '@nestjs/common';
import { Movie } from '../../domain/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieFetcher } from '../../infra/fetchers/movie.fetcher';
import { MovieFiltersDto } from './dto/movie-filters.dto';
import { MovieSortDto } from './dto/movie-sort.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly movieFetcher: MovieFetcher,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, notes } = createMovieDto;

    const omdbData = await this.movieFetcher.getMovieDetails(title);

    const movie = this.movieRepository.create({
      title: omdbData.title,
      releaseDate: omdbData.released,
      rating: omdbData.imdbRating,
      actors: omdbData.actors,
      director: omdbData.director,
      notes,
    });

    return await this.movieRepository.save(movie);
  }

  async listMovies(
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
}
