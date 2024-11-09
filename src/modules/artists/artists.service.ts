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

@Injectable()
export class ArtistsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  async findOne(id: string, httpStatus = HttpStatus.NOT_FOUND) {
    const isArtistIdValid = uuid.validate(id);

    if (!isArtistIdValid) {
      throw new BadRequestException('Artist id is now a valid uuid');
    }

    const artist = await this.database.findArtist(id);

    if (!artist) {
      throw new HttpException(`Artist with id ${id} not found`, httpStatus);
    }

    return artist;
  }

  async findAll() {
    return await this.database.findAllArtists();
  }

  async create(dto: CreateArtistDto) {
    return await this.database.createArtist(dto);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    return await this.database.updateArtist(artist.id, dto);
  }

  async remove(id: string) {
    const artist = await this.findOne(id);

    await this.tracksService.removeArtistId(id);
    await this.albumsService.removeArtistId(id);

    return await this.database.removeArtist(artist.id);
  }

  async findFavorites() {
    const favorites = (await this.database.findAllFavorites()).artists;
    const artists = await this.findAll();

    return favorites
      .map((id) => artists.find((artist) => artist.id === id))
      .filter(Boolean);
  }
}
