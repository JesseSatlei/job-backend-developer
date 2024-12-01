import { ERROR_MESSAGES } from '@common/constants/error-messages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message: string = ERROR_MESSAGES.NOT_FOUND.message) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
