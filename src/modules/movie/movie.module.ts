import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { MovieRepository } from '@infra/repositories/movie.repository';
import { AppLogger } from '@common/services/logger.service';
import { ErrorHandlerService } from '@common/services/error-handler.service';
import { Movie } from '@domain/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieFetcher } from '@infra/fetchers/movie.fetcher';
import { OmdbProvider } from '@infra/providers/omdb.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), HttpModule],
  controllers: [MovieController],
  providers: [
    MovieService,
    MovieRepository,
    MovieFetcher,
    OmdbProvider,
    AppLogger,
    ErrorHandlerService,
  ],
  exports: [MovieFetcher],
})
export class MovieModule {}
