import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/modules/logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, body, query, baseUrl } = req;
    const startDate = Date.now();

    this.loggingService.log(
      this.formatRequestLog(method, baseUrl, body, query),
    );

    res.on('finish', () => {
      const duration = Date.now() - startDate;
      const separator = '------------------------------------------------';

      this.loggingService.log(this.formatResponseLog(res.statusCode, duration));
      this.loggingService.log(separator);
    });

    next();
  }

  private formatRequestLog(
    method: string,
    url: string,
    body: any,
    query: any,
  ): string {
    return `${method}: ${url} \nBODY: ${JSON.stringify(
      body,
      null,
      2,
    )} \nQUERY: ${JSON.stringify(query, null, 2)}`;
  }

  private formatResponseLog(statusCode: number, duration: number): string {
    return `STATUS: ${statusCode} | DURATION: ${duration}ms`;
  }
}
