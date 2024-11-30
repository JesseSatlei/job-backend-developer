import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiProperty({
    description: 'Título do filme a ser atualizado.',
    example: 'The Dark Knight',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    description: 'Atores do filme a serem atualizados.',
    example: 'Christian Bale, Heath Ledger',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  actors?: string;

  @ApiProperty({
    description: 'Diretor do filme a ser atualizado.',
    example: 'Christopher Nolan',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  director?: string;

  @ApiProperty({
    description: 'Data de lançamento do filme no formato ISO 8601.',
    example: '2008-07-18',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @ApiProperty({
    description: 'Nota atribuída ao filme.',
    example: '9.0',
    required: false,
  })
  @IsOptional()
  @IsString()
  rating?: string;

  @ApiProperty({
    description: 'Anotações ou observações sobre o filme.',
    example: 'Um dos melhores filmes de super-heróis de todos os tempos.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes?: string;
}
