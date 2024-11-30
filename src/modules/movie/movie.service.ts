import { Injectable } from '@nestjs/common';
import { Movie } from '../../domain/movie.entity';
import { MovieRepository } from '@/infra/repositories/movie.repository';
import { MovieFetcher } from '@/infra/fetchers/movie.fetcher';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieFiltersDto } from './dto/movie-filters.dto';
import { MovieSortDto } from './dto/movie-sort.dto';
import { NotFoundException } from '@/common/exceptions/not-found.exception';
import { UpdateMovieDto } from './dto/update-movie.dto';

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
    page: number = 1,
    limit: number = 5,
  ): Promise<Movie[]> {
    const offset = (page - 1) * limit;

    return this.movieRepository.findMovies(filters, sort, offset, limit);
  }

  async getMovieById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      throw new NotFoundException();
    }

    return movie;
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      throw new NotFoundException();
    }

    Object.assign(movie, updateMovieDto);

    return this.movieRepository.saveMovie(movie);
  }

  async deleteMovie(id: number): Promise<void> {
    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      throw new NotFoundException();
    }

    await this.movieRepository.remove(movie);
  }
}
