import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../../domain/movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieFetcher } from '../../infra/fetchers/movie.fetcher';
import { OmdbProvider } from '../../infra/providers/omdb.provider';
import { HttpModule } from '@nestjs/axios';
import { MovieRepository } from '@/infra/repositories/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), HttpModule],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, MovieFetcher, OmdbProvider],
})
export class MovieModule {}