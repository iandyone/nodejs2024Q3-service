import { User } from 'src/types';

export class UserResponseDto implements Omit<User, 'password'> {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor({ id, login, version, createdAt, updatedAt }: Partial<User>) {
    this.id = id;
    this.login = login;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
