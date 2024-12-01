import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { MovieModule } from './modules/movie/movie.module';
import { AppLogger } from './common/services/logger.service';
import { ErrorHandlerService } from '@common/services/error-handler.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    HealthCheckModule,
    MovieModule,
  ],
  providers: [
    AppLogger,
    ErrorHandlerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [AppLogger, ErrorHandlerService],
})
export class AppModule {}
