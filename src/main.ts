import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerConfig } from './infra/config/swagger.config';
import { SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';
import { corsConfig } from './infra/config/cors.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = createSwaggerConfig();
  const document = NestSwaggerModule.createDocument(app, swaggerConfig);
  NestSwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
