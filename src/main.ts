import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwaggerConfig } from './infra/config/swagger.config';
import { SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = createSwaggerConfig();
  const document = NestSwaggerModule.createDocument(app, swaggerConfig);
  NestSwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
