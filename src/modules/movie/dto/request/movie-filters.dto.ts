import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieFiltersDto {
  @ApiProperty({
    description: 'Título do filme para buscar anotações.',
    example: 'Inception',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Nome dos atores para filtrar as anotações.',
    example: 'Leonardo DiCaprio',
    required: false,
  })
  @IsOptional()
  @IsString()
  actors?: string;

  @ApiProperty({
    description: 'Nome do diretor para buscar anotações.',
    example: 'Christopher Nolan',
    required: false,
  })
  @IsOptional()
  @IsString()
  director?: string;
}
