import { Body, Controller, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movie-reviews')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Cria uma nova anotação de filme',
    description:
      'Permite criar uma anotação de filme integrando com a API do OMDB para buscar informações adicionais.',
  })
  @ApiCreatedResponse({
    description: 'Anotação de filme criada com sucesso.',
    type: CreateMovieDto,
  })
  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<any> {
    return await this.movieService.createMovie(createMovieDto);
  }
}
