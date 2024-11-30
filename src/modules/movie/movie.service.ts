import { Injectable } from '@nestjs/common';
import { Movie } from '../../domain/movie.entity';
import { MovieRepository } from '@/infra/repositories/movie.repository';
import { MovieFetcher } from '@/infra/fetchers/movie.fetcher';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieFiltersDto } from './dto/movie-filters.dto';
import { MovieSortDto } from './dto/movie-sort.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieFetcher: MovieFetcher,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, notes } = createMovieDto;

    const omdbData = await this.movieFetcher.getMovieDetails(title);

    const movie = await this.movieRepository.saveMovie({
      title: omdbData.title,
      releaseDate: omdbData.released,
      rating: omdbData.imdbRating,
      actors: omdbData.actors,
      director: omdbData.director,
      notes,
    });

    return movie;
  }

  async listMovies(
    filters?: MovieFiltersDto,
    sort?: MovieSortDto,
  ): Promise<Movie[]> {
    return this.movieRepository.findMovies(filters, sort);
  }

  async getMovieById(id: number): Promise<Movie> {
    return this.movieRepository.findMovieById(id);
  }
}
