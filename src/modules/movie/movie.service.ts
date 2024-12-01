import { Injectable } from '@nestjs/common';
import { MovieRepository } from '@infra/repositories/movie.repository';
import { MovieFetcher } from '@infra/fetchers/movie.fetcher';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import { MovieFiltersDto } from './dto/request/movie-filters.dto';
import { MovieSortDto } from './dto/request/movie-sort.dto';
import { NotFoundException } from '@common/exceptions/not-found.exception';
import { UpdateMovieDto } from './dto/request/update-movie.dto';
import { MovieResponse } from './dto/response/movie-response.interface';
import { MovieListResponse } from './dto/response/movie-list-response.interface';
import { AppLogger } from '@common/services/logger.service';
import { MovieTransformer } from './transformers';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieFetcher: MovieFetcher,
    private readonly logger: AppLogger,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<MovieResponse> {
    const { title, notes } = createMovieDto;

    this.logger.log(`Creating movie: ${title}`, 'MovieService');

    const omdbData = await this.movieFetcher.getMovieDetails(title);

    this.logger.log(
      `Fetched data from OMDB for movie: ${title}`,
      'MovieService',
    );

    const movie = await this.movieRepository.saveMovie({
      title: omdbData.title,
      releaseDate: omdbData.released,
      rating: omdbData.imdbRating,
      actors: omdbData.actors,
      director: omdbData.director,
      notes,
    });

    this.logger.log(`Movie created successfully: ${title}`, 'MovieService');

    return MovieTransformer.toResponse(movie);
  }

  async listMovies(
    filters?: MovieFiltersDto,
    sort?: MovieSortDto,
    page: number = 1,
    limit: number = 5,
  ): Promise<MovieListResponse> {
    const offset = (page - 1) * limit;

    this.logger.log(
      `Listing movies with filters: ${JSON.stringify(filters)}, sort: ${JSON.stringify(sort)}, page: ${page}, limit: ${limit}`,
      'MovieService',
    );

    const [movies, total] = await this.movieRepository.findMovies(
      filters,
      sort,
      offset,
      limit,
    );

    this.logger.log(
      `Movies listed successfully. Total: ${total}`,
      'MovieService',
    );

    return MovieTransformer.toListResponse(movies, total, page, limit);
  }

  async getMovieById(id: number): Promise<MovieResponse> {
    this.logger.log(`Getting movie by ID: ${id}`, 'MovieService');

    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      this.logger.error(`Movie not found for ID: ${id}`, 'MovieService');
      throw new NotFoundException();
    }

    this.logger.log(`Found movie by ID: ${id}`, 'MovieService');

    return MovieTransformer.toResponse(movie);
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieResponse> {
    this.logger.log(`Updating movie ID: ${id}`, 'MovieService');

    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      this.logger.error(
        `Movie not found for update. ID: ${id}`,
        'MovieService',
      );
      throw new NotFoundException();
    }

    Object.assign(movie, updateMovieDto);

    const updatedMovie = await this.movieRepository.saveMovie(movie);

    this.logger.log(`Movie updated successfully. ID: ${id}`, 'MovieService');

    return MovieTransformer.toResponse(updatedMovie);
  }

  async deleteMovie(id: number): Promise<void> {
    this.logger.log(`Deleting movie ID: ${id}`, 'MovieService');

    const movie = await this.movieRepository.findMovieById(id);

    if (!movie) {
      this.logger.error(
        `Movie not found for deletion. ID: ${id}`,
        'MovieService',
      );
      throw new NotFoundException();
    }

    await this.movieRepository.remove(movie);

    this.logger.log(`Movie deleted successfully. ID: ${id}`, 'MovieService');
  }
}
