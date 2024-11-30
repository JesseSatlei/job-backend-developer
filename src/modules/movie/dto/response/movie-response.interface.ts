import { ApiProperty } from '@nestjs/swagger';

export class MovieResponse {
  @ApiProperty({
    description: 'Identificador único do filme',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Título do filme',
    example: 'Inception',
  })
  title: string;

  @ApiProperty({
    description: 'Data de lançamento do filme',
    example: '2010-07-16',
  })
  releaseDate: string;

  @ApiProperty({
    description: 'Classificação do filme no IMDB',
    example: '8.8',
  })
  rating: string;

  @ApiProperty({
    description: 'Atores principais do filme',
    example: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
  })
  actors: string;

  @ApiProperty({
    description: 'Diretor do filme',
    example: 'Christopher Nolan',
  })
  director: string;

  @ApiProperty({
    description: 'Notas adicionais sobre o filme (opcional)',
    example: 'Um dos melhores filmes de ficção científica.',
  })
  notes: string;
}
