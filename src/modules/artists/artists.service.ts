import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as uuid from 'uuid';
import { CreateArtistDto } from 'src/models/artist/create-artist.dto';
import { UpdateArtistDto } from 'src/models/artist/update-artist.dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly prisma: PrismaService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  async findOne(id: string, httpStatus = HttpStatus.NOT_FOUND) {
    const isArtistIdValid = uuid.validate(id);

    if (!isArtistIdValid) {
      throw new BadRequestException('Artist id is now a valid uuid');
    }

    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new HttpException(`Artist with id ${id} not found`, httpStatus);
    }

    return artist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async create(dto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: dto });
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    return await this.prisma.artist.update({
      where: { id: artist.id },
      data: dto,
    });
  }

  async remove(id: string) {
    const artist = await this.findOne(id);

    // TODO: add reset artist id from track and album
    // await this.tracksService.removeArtistId(id);
    // await this.albumsService.removeArtistId(id);

    return await this.prisma.artist.delete({ where: { id: artist.id } });
  }

  // TODO
  async findFavorites() {
    const favorites = (await this.database.findAllFavorites()).artists;
    const artists = await this.findAll();

    return favorites
      .map((id) => artists.find((artist) => artist.id === id))
      .filter(Boolean);
  }
}
