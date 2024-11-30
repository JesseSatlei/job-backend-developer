import { ApiProperty } from '@nestjs/swagger';
import { MovieResponse } from './movie-response.interface';

export class MovieListResponse {
  @ApiProperty({
    description: 'Lista de filmes retornados',
    type: [MovieResponse],
  })
  movies: MovieResponse[];

  @ApiProperty({
    description: 'Número total de filmes disponíveis',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Número da página atual da consulta',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Número de itens por página (limite de filmes retornados)',
    example: 10,
  })
  limit: number;
}
