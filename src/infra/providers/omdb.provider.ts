import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppLogger } from '@common/services/logger.service';
import { ErrorHandlerService } from '@common/services/error-handler.service';

@Injectable()
export class OmdbProvider {
  private readonly apiKey = process.env.OMDB_API_KEY || 'aa9290ba';
  private readonly baseUrl =
    process.env.OMDB_BASE_URL || 'http://www.omdbapi.com/';

  constructor(
    private readonly httpService: HttpService,
    private readonly logger: AppLogger,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async fetchMovieData(title: string): Promise<any> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&t=${encodeURIComponent(title)}`;
    this.logger.log(`Calling OMDB API for: ${title}`, 'OmdbProvider');

    try {
      const response = await firstValueFrom(this.httpService.get(url));

      if (response.status !== 200) {
        this.errorHandler.handleErrorByCode('NOT_FOUND', 'OmdbProvider');
      }

      if (response.data && response.data.Response === 'True') {
        this.logger.log(`OMDB API returned data for: ${title}`, 'OmdbProvider');
        return response.data;
      } else {
        this.errorHandler.handleError(
          response.data?.Error || 'Unknown error from OMDB',
          400,
          'OmdbProvider',
        );
      }
    } catch (error) {
      const status = error?.response?.status || 500;
      const message = error?.response?.data?.Error || 'Internal error';

      this.errorHandler.handleError(message, status, 'OmdbProvider');
    }
  }
}
