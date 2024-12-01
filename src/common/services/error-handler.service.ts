import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AppLogger } from './logger.service';
import { ERROR_MESSAGES } from '@common/constants/error-messages';

@Injectable()
export class ErrorHandlerService {
  constructor(private readonly logger: AppLogger) {}

  handleError(message: string, statusCode: number, context: string): never {
    this.logger.error(message, '', context);

    throw new HttpException(
      { message, statusCode },
      statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  handleErrorByCode(
    errorCode: keyof typeof ERROR_MESSAGES,
    context: string,
  ): never {
    const error = ERROR_MESSAGES[errorCode];
    this.logger.error(error.message, '', context);

    throw new HttpException(
      { message: error.message, statusCode: error.statusCode },
      error.statusCode,
    );
  }
}
