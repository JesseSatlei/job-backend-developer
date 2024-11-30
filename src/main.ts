import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerConfig } from './infra/config/swagger.config';
import { SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';
import { corsConfig } from './infra/config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);

  const swaggerConfig = createSwaggerConfig();
  const document = NestSwaggerModule.createDocument(app, swaggerConfig);
  NestSwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
