import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAlbumDto } from '../../models/album/create-album.dto';
import { UpdateAlbumDto } from '../../models/album/update-album.dto';
import { DatabaseService } from '../database/database.service';
import * as uuid from 'uuid';
import { TracksService } from '../tracks/tracks.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly prisma: PrismaService,
    private readonly tracksService: TracksService,
  ) {}

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string, httpStatus = HttpStatus.NOT_FOUND) {
    const isAlbumIdValid = uuid.validate(id);

    if (!isAlbumIdValid) {
      throw new BadRequestException('Album id is now a valid uuid');
    }

    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new HttpException(`Album with id ${id} not found`, httpStatus);
    }

    return album;
  }

  async create(dto: CreateAlbumDto) {
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

    return await this.prisma.album.create({ data: dto });
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.findOne(id);

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

    return await this.prisma.album.update({
      where: { id: album.id },
      data: dto,
    });
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    await this.tracksService.removeAlbumId(id);

    return await this.prisma.album.delete({ where: { id: album.id } });
  }

  async removeArtistId(artistId: string) {
    return await this.prisma.album.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }
}
