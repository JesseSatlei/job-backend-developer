import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OmdbProvider {
  private readonly apiKey = process.env.OMDB_API_KEY || 'aa9290ba';
  private readonly baseUrl = 'http://www.omdbapi.com/';

  constructor(private readonly httpService: HttpService) {}

  async fetchMovieData(title: string): Promise<any> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&t=${encodeURIComponent(title)}`;
    const response = await firstValueFrom(this.httpService.get(url));
    if (response.data && response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error(
        `OMDB API Error: ${response.data?.Error || 'Unknown error'}`,
      );
    }
  }
}
