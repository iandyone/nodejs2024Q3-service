import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/models/album/create-album.dto';
import { UpdateAlbumDto } from 'src/models/album/update-album.dto';
import { CreateArtistDto } from 'src/models/artist/create-artist.dto';
import { UpdateArtistDto } from 'src/models/artist/update-artist.dto';
import { CreateTrackDto } from 'src/models/track/create-track.dto';
import { UpdateTrackDto } from 'src/models/track/update-track.dto';
import { CreateUserDto } from 'src/models/user/create-user.dto';
import { Album, Artist, Favorites, Track, User } from 'src/types';
import * as uuid from 'uuid';

@Injectable()
export class DatabaseService {
  private users: User[] = [
    {
      id: '243a7e6e-dd9d-470c-ab22-ab5ac3333fdc',
      login: 'user1',
      password: 'root',
      version: 1,
      createdAt: Date.now(),
      updatedAt: null,
    },
    {
      id: 'cc8c867b-c063-4128-8b97-3dec8095da2b',
      login: 'user2',
      password: 'root',
      version: 1,
      createdAt: Date.now(),
      updatedAt: null,
    },
  ];

  private artists: Artist[] = [
    {
      id: 'b32838d8-f14c-4341-931a-8fb016ec60ef',
      name: 'artist1',
      grammy: true,
    },
    {
      id: 'f4b7d85d-8c5c-4dc6-a473-bdc8944187b4',
      name: 'artist2',
      grammy: false,
    },
  ];

  private tracks: Track[] = [
    {
      id: '126d1bd6-71fd-4a81-b58b-5b4cad117322',
      name: 'Track name 1',
      duration: 120,
      albumId: uuid.v4(),
      artistId: this.artists[0].id,
    },
    {
      id: '8e90b535-1685-42ac-a40d-bc9d692e941d',
      name: 'Track name 2',
      duration: 173,
      albumId: uuid.v4(),
      artistId: this.artists[1].id,
    },
  ];

  private albums: Album[] = [
    {
      id: '13b12770-f53d-478e-9f9b-b3ce77dcb316',
      name: 'Album name 1',
      artistId: this.artists[0].id,
      year: 1997,
    },
    {
      id: 'a34be6de-a98c-4c13-be97-573d68ba4c6c',
      name: 'Album name 2',
      artistId: this.artists[1].id,
      year: 1997,
    },
  ];

  private favorites: Favorites = {
    albums: [this.albums[0].id],
    artists: [this.artists[0].id],
    tracks: [this.tracks[0].id],
  };

  // User handlers

  async findAllUsers(): Promise<User[]> {
    return await new Promise((res) => res(this.users));
  }

  async findUser(id: string): Promise<User> {
    return await new Promise((res) => {
      const user = this.users.find((user) => user.id === id);

      res(user);
    });
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    return new Promise((res) => {
      const user: User = {
        id: uuid.v4(),
        login,
        password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      this.users.push(user);

      res(user);
    });
  }

  async updateUser(id: string, userDto: Partial<User>): Promise<User> {
    return new Promise(async (res) => {
      const user = await this.findUser(id);

      for (const key in userDto) {
        if (key !== 'id') {
          user[key] = userDto[key];
        }
      }

      user.updatedAt = Date.now();
      user.version = user.version + 1;

      res(user);
    });
  }

  async removeUser(id: string): Promise<string> {
    return new Promise((res) => {
      this.users = this.users.filter((user) => user.id !== id);

      res(id);
    });
  }

  // Artist handlers

  async findAllArtists(): Promise<Artist[]> {
    return new Promise((res) => {
      res(this.artists);
    });
  }

  async findArtist(id: string): Promise<Artist> {
    return await new Promise((res) => {
      const artist = this.artists.find((artist) => artist.id === id);

      res(artist);
    });
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    return new Promise((res) => {
      const artist: Artist = {
        id: uuid.v4(),
        ...dto,
      };

      this.artists.push(artist);

      res(artist);
    });
  }

  async updateArtist(id: string, dto: UpdateArtistDto): Promise<Artist> {
    return new Promise(async (res) => {
      const artist = await this.findArtist(id);

      for (const key in dto) {
        if (key !== 'id') {
          artist[key] = dto[key];
        }
      }

      res(artist);
    });
  }

  async removeArtist(id: string): Promise<string> {
    return new Promise((res) => {
      this.artists = this.artists.filter((artist) => artist.id !== id);

      res(id);
    });
  }

  // Tracks handlers

  async findAllTracks(): Promise<Track[]> {
    return new Promise((res) => res(this.tracks));
  }

  async findTrack(id: string): Promise<Track> {
    return await new Promise((res) => {
      const track = this.tracks.find((track) => track.id === id);

      res(track);
    });
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    return new Promise((res) => {
      const track: Track = {
        id: uuid.v4(),
        ...dto,
      };

      this.tracks.push(track);

      res(track);
    });
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<Track> {
    return new Promise(async (res) => {
      const track = await this.findTrack(id);

      for (const key in dto) {
        if (key !== 'id') {
          track[key] = dto[key];
        }
      }

      res(track);
    });
  }

  async removeTrack(id: string): Promise<string> {
    return new Promise((res) => {
      this.tracks = this.tracks.filter((track) => track.id !== id);

      res(id);
    });
  }

  // Albums handlers

  async findAllAlbums(): Promise<Album[]> {
    return new Promise((res) => res(this.albums));
  }

  async findAlbum(id: string): Promise<Album> {
    return await new Promise((res) => {
      const album = this.albums.find((album) => album.id === id);

      res(album);
    });
  }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    return new Promise((res) => {
      const album: Album = {
        id: uuid.v4(),
        ...dto,
      };

      this.albums.push(album);

      res(album);
    });
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto): Promise<Album> {
    return new Promise(async (res) => {
      const album: Album = await this.findAlbum(id);

      for (const key in dto) {
        if (key !== 'id') {
          album[key] = dto[key];
        }
      }

      res(album);
    });
  }

  async removeAlbum(id: string): Promise<string> {
    return new Promise((res) => {
      this.albums = this.albums.filter((album) => album.id !== id);

      res(id);
    });
  }

  // Favorites handlers

  async findAllFavorites(): Promise<Favorites> {
    return this.favorites;
  }

  async addFavoriteTrack(id: string) {
    this.favorites.tracks.push(id);
    return id;
  }

  async addFavoriteArtist(id: string) {
    this.favorites.artists.push(id);
    return id;
  }

  async addFavoriteAlbum(id: string) {
    this.favorites.albums.push(id);
    return id;
  }

  async removeFavoriteTrack(id: string) {
    if (id) {
      this.favorites.tracks = this.favorites.tracks.filter(
        (favoriteId) => favoriteId !== id,
      );
    }
  }

  async removeFavoriteArtist(id: string) {
    if (id) {
      this.favorites.artists = this.favorites.artists.filter(
        (favoriteId) => favoriteId !== id,
      );
    }
  }

  async removeFavoriteAlbum(id: string) {
    if (id) {
      this.favorites.albums = this.favorites.albums.filter(
        (favoriteId) => favoriteId !== id,
      );
    }
  }
}
