import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yaml';
import * as path from 'path';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

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

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
