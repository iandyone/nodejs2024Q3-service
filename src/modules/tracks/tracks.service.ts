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
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly database: DatabaseService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string, httpStatus = HttpStatus.NOT_FOUND) {
    const isTrackIdValid = uuid.validate(id);

    if (!isTrackIdValid) {
      throw new BadRequestException('Track id is now a valid uuid');
    }

    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException(`Track with id ${id} not found`, httpStatus);
    }

    return track;
  }

  async create(dto: CreateTrackDto) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: dto.artistId },
    });

    if (!artist) {
      throw new BadRequestException(`Artist with id ${dto.artistId} not found`);
    }

    const album = await this.prisma.album.findUnique({
      where: { id: dto.albumId },
    });

    if (!album) {
      throw new BadRequestException(`Album  with id ${dto.albumId} not found`);
    }

    return await this.prisma.track.create({ data: dto });
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.findOne(id);

    if (dto.artistId) {
      const artist = await this.prisma.artist.findUnique({
        where: { id: dto.artistId },
      });

      if (!artist) {
        throw new BadRequestException(
          `Artist with id ${dto.artistId} not found`,
        );
      }
    }

    if (dto.albumId) {
      const album = await this.prisma.album.findUnique({
        where: { id: dto.albumId },
      });

      if (!album) {
        throw new BadRequestException(
          `Album  with id ${dto.albumId} not found`,
        );
      }
    }

    return await this.prisma.track.update({
      where: { id: track.id },
      data: dto,
    });
  }

  async remove(id: string) {
    const track = await this.findOne(id);

    return await this.prisma.track.delete({ where: { id: track.id } });
  }

  // TODO: add prisma
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

  // TODO: add prisma
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

  // TODO: add prisma
  async findFavorites() {
    const favorites = (await this.database.findAllFavorites()).tracks;
    const tracks = await this.findAll();

    return favorites
      .map((id) => tracks.find((track) => track.id === id))
      .filter(Boolean);
  }
}
