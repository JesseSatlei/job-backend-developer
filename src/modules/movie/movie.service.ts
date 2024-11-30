import { Injectable } from '@nestjs/common';
import { Movie } from '../../domain/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieFetcher } from '../../infra/fetchers/movie.fetcher';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly movieFetcher: MovieFetcher,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, notes } = createMovieDto;

    const omdbData = await this.movieFetcher.getMovieDetails(title);

    const movie = this.movieRepository.create({
      title: omdbData.title,
      releaseDate: omdbData.released,
      rating: omdbData.imdbRating,
      notes,
    });

    return await this.movieRepository.save(movie);
  }
}
