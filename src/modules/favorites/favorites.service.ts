import { HttpStatus, Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { FavoritesResponse } from 'src/types';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly database: DatabaseService,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  async findAll() {
    const favorites: FavoritesResponse = {
      tracks: await this.tracksService.findFavorites(),
      artists: await this.artistsService.findFavorites(),
      albums: await this.albumsService.findFavorites(),
    };

    return favorites;
  }

  async addTrack(id: string) {
    const track = await this.tracksService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    return this.database.addFavoriteTrack(track.id);
  }
  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    return this.database.addFavoriteArtist(artist.id);
  }
  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    return this.database.addFavoriteAlbum(album.id);
  }

  async removeTrack(id: string) {
    return this.database.removeFavoriteTrack(id);
  }

  async removeArtist(id: string) {
    return this.database.removeFavoriteArtist(id);
  }

  async removeAlbum(id: string) {
    return this.database.removeFavoriteAlbum(id);
  }
}
