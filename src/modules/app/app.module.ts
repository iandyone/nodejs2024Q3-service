import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/modules/users/users.module';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
