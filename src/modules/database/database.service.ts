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
    return this.users;
  }

  async findUser(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const user: User = {
      id: uuid.v4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);

    return user;
  }

  async updateUser(id: string, userDto: Partial<User>): Promise<User> {
    const user = await this.findUser(id);

    for (const key in userDto) {
      if (key !== 'id') {
        user[key] = userDto[key];
      }
    }

    user.updatedAt = Date.now();
    user.version = user.version + 1;

    return user;
  }

  async removeUser(id: string): Promise<string> {
    this.users = this.users.filter((user) => user.id !== id);

    return id;
  }

  // Artist handlers

  async findAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async findArtist(id: string): Promise<Artist> {
    return this.artists.find((artist) => artist.id === id);
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = {
      id: uuid.v4(),
      ...dto,
    };

    this.artists.push(artist);

    return artist;
  }

  async updateArtist(id: string, dto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findArtist(id);

    for (const key in dto) {
      if (key !== 'id') {
        artist[key] = dto[key];
      }
    }

    return artist;
  }

  async removeArtist(id: string): Promise<string> {
    this.artists = this.artists.filter((artist) => artist.id !== id);

    return id;
  }

  // Tracks handlers

  async findAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async findTrack(id: string): Promise<Track> {
    return this.tracks.find((track) => track.id === id);
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    const track: Track = {
      id: uuid.v4(),
      ...dto,
    };

    this.tracks.push(track);

    return track;
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<Track> {
    const track = await this.findTrack(id);

    for (const key in dto) {
      if (key !== 'id') {
        track[key] = dto[key];
      }
    }

    return track;
  }

  async removeTrack(id: string): Promise<string> {
    this.tracks = this.tracks.filter((track) => track.id !== id);

    return id;
  }

  // Albums handlers

  async findAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async findAlbum(id: string): Promise<Album> {
    return this.albums.find((album) => album.id === id);
  }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const album: Album = {
      id: uuid.v4(),
      ...dto,
    };

    this.albums.push(album);

    return album;
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const album: Album = await this.findAlbum(id);

    for (const key in dto) {
      if (key !== 'id') {
        album[key] = dto[key];
      }
    }

    return album;
  }

  async removeAlbum(id: string): Promise<string> {
    this.albums = this.albums.filter((album) => album.id !== id);

    return id;
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
