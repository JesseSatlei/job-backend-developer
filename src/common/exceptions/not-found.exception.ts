import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/error-messages';

export class NotFoundException extends HttpException {
  constructor(message: string = ERROR_MESSAGES.MOVIE_NOT_FOUND.message) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
