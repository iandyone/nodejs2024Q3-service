import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    const [
      tracksFavoriteIdsData,
      artistsFavoriteIdsData,
      albumsFavoriteIdsData,
    ] = await Promise.all([
      this.prisma.favoriteTracks.findMany(),
      this.prisma.favoriteArtists.findMany(),
      this.prisma.favoriteAlbums.findMany(),
    ]);

    const tracksIds = tracksFavoriteIdsData.map((track) => track.trackId);
    const artistsIds = artistsFavoriteIdsData.map((artist) => artist.artistId);
    const albumsIds = albumsFavoriteIdsData.map((album) => album.albumId);

    const [tracks, artists, albums] = await Promise.all([
      this.prisma.track.findMany({ where: { id: { in: tracksIds } } }),
      this.prisma.artist.findMany({ where: { id: { in: artistsIds } } }),
      this.prisma.album.findMany({ where: { id: { in: albumsIds } } }),
    ]);

    return {
      tracks,
      artists,
      albums,
    };
  }

  async addTrack(id: string) {
    const track = await this.tracksService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    if (!track) {
      throw new BadRequestException(`Track with id ${id} not found`);
    }

    return await this.prisma.favoriteTracks.create({
      data: { trackId: track.id },
    });
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    if (!artist) {
      throw new BadRequestException(`Artist with id ${id} not found`);
    }

    return await this.prisma.favoriteArtists.create({
      data: { artistId: artist.id },
    });
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    if (!album) {
      throw new BadRequestException(`Album with id ${id} not found`);
    }

    return await this.prisma.favoriteAlbums.create({
      data: { albumId: album.id },
    });
  }

  async removeTrack(id: string) {
    const track = await this.tracksService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    if (!track) {
      throw new BadRequestException(`Track with id ${id} not found`);
    }

    return await this.prisma.favoriteTracks.deleteMany({
      where: { trackId: track.id },
    });
  }

  async removeArtist(id: string) {
    const artist = await this.artistsService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    if (!artist) {
      throw new BadRequestException(`Artist with id ${id} not found`);
    }

    return await this.prisma.favoriteArtists.deleteMany({
      where: { artistId: artist.id },
    });
  }

  async removeAlbum(id: string) {
    const album = await this.albumsService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

    if (!album) {
      throw new BadRequestException(`Album with id ${id} not found`);
    }

    return await this.prisma.favoriteAlbums.deleteMany({
      where: { albumId: album.id },
    });
  }
}
