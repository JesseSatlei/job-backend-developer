import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { MovieController } from '@/modules/movie/movie.controller';
import { MovieService } from '@/modules/movie/movie.service';
import { CreateMovieDto } from '@/modules/movie/dto/create-movie.dto';
import { UpdateMovieDto } from '@/modules/movie/dto/update-movie.dto';

describe('MovieController', () => {
  let app;
  const movieService = {
    createMovie: jest.fn(),
    listMovies: jest.fn(),
    getMovieById: jest.fn(),
    updateMovie: jest.fn(),
    deleteMovie: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: movieService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('POST /movie-reviews should create a movie annotation', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'Movie Title',
      notes: 'Great movie!',
    };

    const createdMovie = { ...createMovieDto, id: 1 };

    movieService.createMovie.mockResolvedValue(createdMovie);

    return request(app.getHttpServer())
      .post('/movie-reviews')
      .send(createMovieDto)
      .expect(HttpStatus.CREATED)
      .expect((response) => {
        expect(response.body).toEqual(createdMovie);
      });
  });

  it('GET /movie-reviews/list should return list of movie annotations', async () => {
    const movieList = [
      { id: 1, title: 'Movie Title 1', review: 'Great movie!' },
      { id: 2, title: 'Movie Title 2', review: 'Not bad!' },
    ];

    movieService.listMovies.mockResolvedValue({ movies: movieList, count: 2 });

    return request(app.getHttpServer())
      .get('/movie-reviews/list')
      .query({ page: 1, limit: 10 })
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body.movies).toEqual(movieList);
      });
  });

  it('GET /movie-reviews/:id should return a movie annotation by id', async () => {
    const movie = { id: 1, title: 'Movie Title', review: 'Great movie!' };

    movieService.getMovieById.mockResolvedValue(movie);

    return request(app.getHttpServer())
      .get('/movie-reviews/1')
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body).toEqual(movie);
      });
  });

  it('PUT /movie-reviews/:id should update a movie annotation', async () => {
    const updateMovieDto: UpdateMovieDto = {
      title: 'Updated Movie Title',
      notes: 'Updated review!',
    };

    const updatedMovie = { id: 1, ...updateMovieDto };

    movieService.updateMovie.mockResolvedValue(updatedMovie);

    return request(app.getHttpServer())
      .put('/movie-reviews/1')
      .send(updateMovieDto)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body).toEqual(updatedMovie);
      });
  });

  it('DELETE /movie-reviews/:id should delete a movie annotation', async () => {
    movieService.deleteMovie.mockResolvedValue(undefined);

    return request(app.getHttpServer())
      .delete('/movie-reviews/1')
      .expect(HttpStatus.NO_CONTENT)
      .expect((response) => {
        expect(response.body).toEqual({});
      });
  });
});
