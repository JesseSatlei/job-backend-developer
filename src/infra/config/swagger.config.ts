import { DocumentBuilder } from '@nestjs/swagger';

export const createSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('API Movies')
    .setDescription('API para o sistema de anotações de filmes')
    .setVersion('1.0')
    .build();
};
