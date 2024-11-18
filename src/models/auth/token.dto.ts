import { TokenData } from 'src/types';

export class TokenDto {
  id: string;
  login: string;

  constructor({ id, login }: TokenData) {
    this.id = id;
    this.login = login;
  }
}
