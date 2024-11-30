import { Module } from '@nestjs/common';
import { AppController } from './health-check.controller';
import { AppService } from './health-check.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class HealthCheckModule {}
