import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/modules/logging/logging.service';
import { formatRequestLog } from 'src/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, body, query, baseUrl } = req;
    const startDate = Date.now();

    this.loggingService.log(formatRequestLog(method, baseUrl, body, query));

    res.on('finish', () => {
      const duration = Date.now() - startDate;
      const separator = '------------------------------------------------';

      this.loggingService.log(this.formatResponseLog(res.statusCode, duration));
      this.loggingService.log(separator);
    });

    next();
  }

  private formatResponseLog(statusCode: number, duration: number): string {
    return `STATUS: ${statusCode} | DURATION: ${duration}ms`;
  }
}
