import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as uuid from 'uuid';
import { CreateArtistDto } from 'src/models/artist/create-artist.dto';
import { UpdateArtistDto } from 'src/models/artist/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly database: DatabaseService) {}

  async findOne(id: string) {
    const isArtistIdValid = uuid.validate(id);

    if (!isArtistIdValid) {
      throw new BadRequestException('Artist id is now a valid uuid');
    }

    const artist = await this.database.findArtist(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
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
    const isUserExists = await this.findOne(id);

    if (!isUserExists) {
      throw new BadRequestException(`Artist with ${id} not found`);
    }

    // TODO: should set track.artistId to null after deletion
    // TODO: should set album.artistId to null after deletion

    return await this.database.removeArtist(id);
  }
}
