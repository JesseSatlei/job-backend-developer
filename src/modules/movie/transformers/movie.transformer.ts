import { Movie } from '@/domain/movie.entity';
import { MovieResponse } from '../dto/response/movie-response.interface';
import { MovieListResponse } from '../dto/response/movie-list-response.interface';

export class MovieTransformer {
  static toResponse(movie: Movie): MovieResponse {
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
      actors: movie.actors,
      director: movie.director,
      notes: movie.notes,
    };
  }

  static toListResponse(
    movies: Movie[],
    total: number,
    page: number,
    limit: number,
  ): MovieListResponse {
    return {
      movies: movies.map(MovieTransformer.toResponse),
      total,
      page,
      limit,
    };
  }
}
