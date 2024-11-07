import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from '../../models/album/create-album.dto';
import { UpdateAlbumDto } from '../../models/album/update-album.dto';
import { DatabaseService } from '../database/database.service';
import * as uuid from 'uuid';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly tracksService: TracksService,
  ) {}

  async create(dto: CreateAlbumDto) {
    return await this.database.createAlbum(dto);
  }

  async findAll() {
    return await this.database.findAllAlbums();
  }

  async findOne(id: string) {
    const isAlbumIdValid = uuid.validate(id);

    if (!isAlbumIdValid) {
      throw new BadRequestException('Album id is now a valid uuid');
    }

    const album = await this.database.findAlbum(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    return await this.database.updateAlbum(album.id, dto);
  }

  async remove(id: string) {
    const album = await this.findOne(id);

    await this.tracksService.removeAlbumId(id);

    return await this.database.removeAlbum(album.id);
  }

  async removeArtistId(artistId: string) {
    return new Promise(async (res) => {
      const albums = await this.database.findAllAlbums();

      albums.forEach((track) => {
        if (track.artistId === artistId) {
          this.database.updateAlbum(track.id, { artistId: null });
        }
      });

      res(true);
    });
  }
}
