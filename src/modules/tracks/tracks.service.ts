import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateTrackDto } from '../../models/track/create-track.dto';
import { UpdateTrackDto } from '../../models/track/update-track.dto';
import { DatabaseService } from '../database/database.service';
import * as uuid from 'uuid';

@Injectable()
export class TracksService {
  constructor(private readonly database: DatabaseService) {}

  async create(dto: CreateTrackDto) {
    return await this.database.createTrack(dto);
  }

  async findAll() {
    return await this.database.findAllTracks();
  }

  async findOne(id: string, httpStatus = HttpStatus.NOT_FOUND) {
    const isTrackIdValid = uuid.validate(id);

    if (!isTrackIdValid) {
      throw new BadRequestException('Track id is now a valid uuid');
    }

    const track = await this.database.findTrack(id);

    if (!track) {
      throw new HttpException(`Track with id ${id} not found`, httpStatus);
    }

    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.findOne(id);

    return await this.database.updateTrack(track.id, dto);
  }

  async remove(id: string) {
    const track = await this.findOne(id);

    return await this.database.removeTrack(track.id);
  }

  async removeAlbumId(albumId: string) {
    return new Promise(async (res) => {
      const tracks = await this.database.findAllTracks();

      tracks.forEach((track) => {
        if (track.albumId === albumId) {
          this.database.updateTrack(track.id, { albumId: null });
        }
      });

      res(true);
    });
  }
  async removeArtistId(artistId: string) {
    return new Promise(async (res) => {
      const tracks = await this.database.findAllTracks();

      tracks.forEach((track) => {
        if (track.artistId === artistId) {
          this.database.updateTrack(track.id, { artistId: null });
        }
      });

      res(true);
    });
  }

  async findFavorites() {
    const favorites = (await this.database.findAllFavorites()).tracks;
    const tracks = await this.findAll();

    return favorites
      .map((id) => tracks.find((track) => track.id === id))
      .filter(Boolean);
  }
}
