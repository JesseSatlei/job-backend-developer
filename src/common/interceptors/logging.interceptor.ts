import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppLogger } from '@common/services/logger.service';
import { ErrorHandlerService } from '@common/services/error-handler.service';
import { ERROR_MESSAGES } from '@common/constants/error-messages';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: AppLogger,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    this.logger.log(`Incoming request: ${method} ${url}`, 'RequestLogger');

    return next.handle().pipe(
      tap((response) => {
        const responseTime = Date.now() - now;
        const statusCode = response.statusCode || 200;
        this.logger.log(
          `Request completed: ${method} ${url} - Status: ${statusCode} - ${responseTime}ms`,
          'RequestLogger',
        );
      }),
      catchError((error) => {
        // Verifica se o erro tem um código em ERROR_MESSAGES e usa o `handleErrorByCode`
        const errorCode = Object.keys(ERROR_MESSAGES).find(
          (key) =>
            ERROR_MESSAGES[key as keyof typeof ERROR_MESSAGES].message ===
            error.message,
        ) as keyof typeof ERROR_MESSAGES;

        if (errorCode) {
          this.errorHandler.handleErrorByCode(errorCode, 'LoggingInterceptor');
        } else {
          this.errorHandler.handleError(
            error.message,
            error.statusCode || error.status,
            'LoggingInterceptor',
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
