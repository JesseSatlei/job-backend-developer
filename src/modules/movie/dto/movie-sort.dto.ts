import { IsEnum, IsOptional } from 'class-validator';

export class MovieSortDto {
  @IsOptional()
  @IsEnum(['releaseDate', 'rating'])
  field: 'releaseDate' | 'rating';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order: 'ASC' | 'DESC';
}
