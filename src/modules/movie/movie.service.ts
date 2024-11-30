import { Injectable } from '@nestjs/common';
import { MovieRepository } from '@/infra/repositories/movie.repository';
import { MovieFetcher } from '@/infra/fetchers/movie.fetcher';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieFiltersDto } from './dto/movie-filters.dto';
import { MovieSortDto } from './dto/movie-sort.dto';
import { NotFoundException } from '@/common/exceptions/not-found.exception';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieTransformer } from './transformers/movie.transformer';
import { MovieResponse } from './dto/response/movie-response.interface';
import { MovieListResponse } from './dto/response/movie-list-response.interface';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieFetcher: MovieFetcher,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<MovieResponse> {
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

    return MovieTransformer.toResponse(movie);
  }

  async listMovies(
    filters?: MovieFiltersDto,
    sort?: MovieSortDto,
    page: number = 1,
    limit: number = 5,
  ): Promise<MovieListResponse> {
    const offset = (page - 1) * limit;

    const [movies, total] = await this.movieRepository.findMovies(
      filters,
      sort,
      offset,
      limit,
    );

    return MovieTransformer.toListResponse(movies, total, page, limit);
  }

  async getMovieById(id: number): Promise<MovieResponse> {
    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      throw new NotFoundException();
    }

    return MovieTransformer.toResponse(movie);
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieResponse> {
    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      throw new NotFoundException();
    }

    Object.assign(movie, updateMovieDto);

    const updatedMovie = await this.movieRepository.saveMovie(movie);
    return MovieTransformer.toResponse(updatedMovie);
  }

  async deleteMovie(id: number): Promise<void> {
    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      throw new NotFoundException();
    }

    await this.movieRepository.remove(movie);
  }
}
