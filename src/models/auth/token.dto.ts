import { User } from '@prisma/client';

export class TokenDto {
  userId: string;
  login: string;

  constructor({ id, login }: User) {
    this.userId = id;
    this.login = login;
  }
}
