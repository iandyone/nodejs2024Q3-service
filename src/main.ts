import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yaml';
import * as path from 'path';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './filters/exception.filter';
import { LoggingService } from './modules/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggingService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter(logger));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription(
      'The Home Library Service is a REST API designed for managing users, artists, tracks, albums, and favorites. Users can add and remove artists, albums, and tracks to their own favorites list.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const yamlString = YAML.stringify(document);
  fs.writeFileSync(
    path.resolve(__dirname, '../', 'doc', 'api.yaml'),
    yamlString,
  );

  process.on('uncaughtException', (error: Error) => {
    logger.error(
      'Uncaught exception detected. The application will exit now.',
      error.stack,
    );
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    const error = new Error(`Unhandled Rejection: ${reason}`);
    logger.error(`Unhandled Rejection: ${error.message}`, error.stack);
    process.exit(1);
  });

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
