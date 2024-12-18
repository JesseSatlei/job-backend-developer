import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/request/create-movie.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  MovieFiltersDto,
  MovieSortDto,
  PaginationDto,
  UpdateMovieDto,
} from './dto/request';
import { MovieListResponse, MovieResponse } from './dto/response';

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
    type: MovieResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Os dados enviados são inválidos.',
  })
  @Post()
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<MovieResponse> {
    return await this.movieService.createMovie(createMovieDto);
  }

  @ApiOperation({
    summary: 'Lista as anotações de filmes com filtros e ordenação',
    description:
      'Permite listar as anotações de filmes com filtros e ordenação.',
  })
  @ApiOkResponse({
    description: 'Anotação de filme encontrada.',
    type: MovieListResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Os parâmetros de filtro ou paginação são inválidos.',
  })
  @Get('list')
  async listMovies(
    @Query() filters: MovieFiltersDto,
    @Query() sort: MovieSortDto,
    @Query() pagination: PaginationDto,
  ): Promise<MovieListResponse> {
    const { page, limit } = pagination;

    return this.movieService.listMovies(filters, sort, page, limit);
  }

  @ApiOperation({
    summary: 'Lista uma anotação de filme específica',
    description:
      'Permite listar uma anotação de filme específica com base no ID fornecido.',
  })
  @ApiOkResponse({
    description: 'Anotação de filme encontrada.',
    type: MovieResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Anotação de filme não encontrada.',
  })
  @ApiResponse({
    status: 400,
    description: 'O ID fornecido é inválido.',
  })
  @Get(':id')
  async getMovieById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovieResponse> {
    return this.movieService.getMovieById(id);
  }

  @ApiOperation({
    summary: 'Atualiza uma anotação de filme existente',
    description:
      'Permite atualizar os detalhes de uma anotação de filme existente.',
  })
  @ApiOkResponse({
    description: 'Anotação de filme atualizada com sucesso.',
    type: MovieResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Anotação de filme não encontrada.',
  })
  @ApiResponse({
    status: 400,
    description: 'Os dados enviados são inválidos ou incompletos.',
  })
  @Put(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<MovieResponse> {
    return await this.movieService.updateMovie(id, updateMovieDto);
  }

  @ApiOperation({
    summary: 'Deleta uma anotação de filme',
    description: 'Permite deletar uma anotação de filme com base no ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Anotação de filme deletada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Filme não encontrado.',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMovie(@Param('id', ParseIntPipe) id: number) {
    await this.movieService.deleteMovie(id);
  }
}
