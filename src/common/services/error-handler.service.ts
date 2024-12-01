import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constants/error-messages';
import { AppLogger } from './logger.service';

@Injectable()
export class ErrorHandlerService {
  constructor(private readonly logger: AppLogger) {}

  handleError(message: string, statusCode: number, context: string): never {
    this.logger.error(message, '', context);

    switch (statusCode) {
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(message);
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(message);
      case HttpStatus.INTERNAL_SERVER_ERROR:
        throw new InternalServerErrorException(message);
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(message);
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(message);
      default:
        throw new HttpException(
          { message, statusCode },
          statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  handleErrorByCode(
    errorCode: keyof typeof ERROR_MESSAGES,
    context: string,
  ): never {
    const error = ERROR_MESSAGES[errorCode];
    this.logger.error(error.message, '', context);

    switch (error.statusCode) {
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException(error.message);
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException(error.message);
      case HttpStatus.INTERNAL_SERVER_ERROR:
        throw new InternalServerErrorException(error.message);
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException(error.message);
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException(error.message);
      default:
        throw new HttpException(
          { message: error.message, statusCode: error.statusCode },
          error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
