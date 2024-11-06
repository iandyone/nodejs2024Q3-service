import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/models/user/create.dto';
import { User } from 'src/types';
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
}
