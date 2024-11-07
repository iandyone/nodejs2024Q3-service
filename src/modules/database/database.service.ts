import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from 'src/models/artist/create-artist.dto';
import { UpdateArtistDto } from 'src/models/artist/update-artist.dto';
import { CreateUserDto } from 'src/models/user/create-user.dto';
import { Artist, User } from 'src/types';
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

  async getAllUsers(): Promise<User[]> {
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

  async deleteUser(id: string): Promise<string> {
    return new Promise((res) => {
      this.users = this.users.filter((user) => user.id !== id);

      res(id);
    });
  }

  async getAllArtists(): Promise<Artist[]> {
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

  async deleteArtist(id: string): Promise<string> {
    return new Promise((res) => {
      this.artists = this.artists.filter((artist) => artist.id !== id);

      res(id);
    });
  }
}
