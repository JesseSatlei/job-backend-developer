import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MovieFiltersDto } from './dto/movie-filters.dto';
import { MovieSortDto } from './dto/movie-sort.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PaginationDto } from './dto/pagination.dto';
import { MovieResponse } from './dto/response/movie-response.interface';
import { MovieListResponse } from './dto/response/movie-list-response.interface';

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
  async deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return await this.movieService.deleteMovie(id);
  }
}
