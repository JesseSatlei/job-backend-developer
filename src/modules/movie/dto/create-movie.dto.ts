import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Título do filme usado para buscar informações no OMDB',
    example: 'Inception',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Notas pessoais sobre o filme',
    example: 'Um dos melhores filmes que já vi!',
  })
  @IsString()
  @IsNotEmpty()
  notes: string;
}
