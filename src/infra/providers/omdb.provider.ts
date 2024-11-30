import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ERROR_MESSAGES } from '@/common/constants/error-messages';

@Injectable()
export class OmdbProvider {
  private readonly apiKey = process.env.OMDB_API_KEY || 'aa9290ba';
  private readonly baseUrl =
    process.env.OMDB_BASE_URL || 'http://www.omdbapi.com/';

  constructor(private readonly httpService: HttpService) {}

  async fetchMovieData(title: string): Promise<any> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&t=${encodeURIComponent(title)}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));

      if (response.status !== 200) {
        throw this.createOmdbException(response.status);
      }

      if (response.data && response.data.Response === 'True') {
        return response.data;
      } else {
        throw this.createOmdbException(response.data?.Error);
      }
    } catch (error) {
      if (error?.response?.status) {
        throw this.createOmdbException(error.response.status);
      } else {
        throw this.createOmdbException(500);
      }
    }
  }

  private createOmdbException(statusCode: number): HttpException {
    switch (statusCode) {
      case 404:
        return new HttpException(
          ERROR_MESSAGES.NOT_FOUND.message,
          ERROR_MESSAGES.NOT_FOUND.statusCode,
        );
      case 403:
        return new HttpException(
          ERROR_MESSAGES.INVALID_API_KEY.message,
          ERROR_MESSAGES.INVALID_API_KEY.statusCode,
        );
      case 400:
        return new HttpException(
          ERROR_MESSAGES.TOO_MANY_RESULTS.message,
          ERROR_MESSAGES.TOO_MANY_RESULTS.statusCode,
        );
      default:
        return new HttpException(
          ERROR_MESSAGES.GENERIC_ERROR.message,
          ERROR_MESSAGES.GENERIC_ERROR.statusCode,
        );
    }
  }
}
