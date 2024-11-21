import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logsFilePath: string;
  private readonly errorLogsFilePath: string;
  private readonly logLevel: number;
  private readonly logFileSize: number;

  constructor(private readonly configService: ConfigService) {
    this.logLevel = Number(configService.get('')) || 0; // 0 - INFO, 1 - WARN, 2 - ERROR
    this.logFileSize = Number(configService.get('LOG_FILE_MAX_SIZE')) || 10240;
    this.logsFilePath = path.resolve('logs', 'home-service.log');
    this.errorLogsFilePath = path.resolve('logs', 'errors.log');

    this.createLogDir();
  }

  private createLogDir() {
    const logDirectory = path.dirname(this.logsFilePath);

    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }

    this.log('The log storage folder has been created');
  }

  private shouldLogging(logLvl: number) {
    return logLvl >= this.logLevel;
  }

  private logToFile(message: string, level: string, filePath: string) {
    const currentDate = this.getCurrentDate();
    const logMessage = `${currentDate} [${level}] ${message}\n`;

    const stats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    if (stats && stats.size > this.logFileSize * 1024) {
      fs.truncateSync(filePath, 0);
    }

    fs.appendFileSync(filePath, logMessage);
  }

  private getCurrentDate(): string {
    const currentDate = new Date(Date.now() + 3 * 60 * 60 * 1000); // UTC+3
    return new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(currentDate);
  }

  log(message: string) {
    if (this.shouldLogging(0)) {
      console.warn(message);
      this.logToFile(message, 'LOG', this.logsFilePath);
    }
  }

  warn(message: string) {
    if (this.shouldLogging(1)) {
      console.warn(message);
      this.logToFile(message, 'WARN', this.logsFilePath);
    }
  }

  error(message: string, trace?: string) {
    if (this.shouldLogging(2)) {
      console.error(message);
      this.logToFile(message, 'ERROR', this.errorLogsFilePath);
      this.logToFile(trace, 'ERROR', this.errorLogsFilePath);
    }
  }
}
