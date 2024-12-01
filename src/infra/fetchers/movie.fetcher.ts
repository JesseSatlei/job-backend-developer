import { HttpException, Injectable } from '@nestjs/common';
import { OmdbProvider } from '../providers/omdb.provider';
import { AppLogger } from '@/common/services/logger.service';
import { ErrorHandlerService } from '@/common/services/error-handler.service';
import { ERROR_MESSAGES } from '@/common/constants/error-messages';

@Injectable()
export class MovieFetcher {
  constructor(
    private readonly omdbProvider: OmdbProvider,
    private readonly logger: AppLogger,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async getMovieDetails(title: string) {
    this.logger.log(`Fetching movie details for: ${title}`, 'MovieFetcher');

    try {
      const movieData = await this.omdbProvider.fetchMovieData(title);
      this.logger.log(
        `Successfully fetched data for: ${title}`,
        'MovieFetcher',
      );

      return {
        title: movieData.Title,
        released: movieData.Released,
        imdbRating: movieData.imdbRating,
        poster: movieData.Poster,
        genre: movieData.Genre,
        director: movieData.Director,
        actors: movieData.Actors,
        plot: movieData.Plot,
        language: movieData.Language,
      };
    } catch (error) {
      const message =
        error instanceof HttpException
          ? error.message
          : ERROR_MESSAGES.GENERIC_ERROR.message;

      this.errorHandler.handleError(
        `Failed to fetch movie details for: ${title} - ${message}`,
        error.status || 500,
        'MovieFetcher',
      );
    }
  }
}
