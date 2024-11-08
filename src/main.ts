import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yaml';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for your NestJS project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // Make an api.yaml file according the app
  const yamlString = YAML.stringify(document);
  fs.writeFileSync(
    path.resolve(__dirname, '../', 'doc', 'api.yaml'),
    yamlString,
  );

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
