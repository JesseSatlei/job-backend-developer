import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerConfig } from './infra/config/swagger.config';
import { SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';
import { corsConfig } from './infra/config/cors.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  app.enableShutdownHooks();

  app.enableCors(corsConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = createSwaggerConfig();
  const document = NestSwaggerModule.createDocument(app, swaggerConfig);
  NestSwaggerModule.setup('docs', app, document);

  const logger = new Logger('Bootstrap');
  await app.listen(3000);
  logger.log('Application is running on: ' + (await app.getUrl()));
}
bootstrap();
