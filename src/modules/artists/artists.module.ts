import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Module({
  providers: [ArtistsService, TracksService, AlbumsService],
  controllers: [ArtistsController],
})
export class ArtistsModule {}
