import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    const statusCode = status || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage =
      typeof message === 'string'
        ? message
        : message['message'] || 'Internal Server Error';

    response.status(statusCode).json({
      statusCode,
      message: errorMessage,
    });
  }
}
