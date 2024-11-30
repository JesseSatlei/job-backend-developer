import { IsOptional, IsString } from 'class-validator';

export class MovieFiltersDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  actors?: string;

  @IsOptional()
  @IsString()
  director?: string;
}
