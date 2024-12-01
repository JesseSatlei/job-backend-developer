import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieSortDto {
  @ApiProperty({
    description: 'Campo usado para ordenação.',
    enum: ['releaseDate', 'rating'],
    example: 'releaseDate',
    required: false,
  })
  @IsOptional()
  @IsEnum(['releaseDate', 'rating'])
  field: 'releaseDate' | 'rating';

  @ApiProperty({
    description: 'Ordem da ordenação, podendo ser ascendente ou descendente.',
    enum: ['ASC', 'DESC'],
    example: 'ASC',
    required: false,
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}
