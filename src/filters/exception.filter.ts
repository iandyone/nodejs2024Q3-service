import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/modules/logging/logging.service';
import { formatRequestLog } from 'src/utils';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { method, baseUrl, body, query } = request;

    this.loggingService.error(formatRequestLog(method, baseUrl, body, query));

    response.status(status).json({
      statusCode: status || HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().getTime(),
      path: request.url,
      message: exception.getResponse() || 'Internal server error',
    });
  }
}
