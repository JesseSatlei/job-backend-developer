import { Injectable } from '@nestjs/common';
import { OmdbProvider } from '../providers/omdb.provider';

@Injectable()
export class MovieFetcher {
  constructor(private readonly omdbProvider: OmdbProvider) {}

  async getMovieDetails(title: string) {
    const movieData = await this.omdbProvider.fetchMovieData(title);
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
  }
}
