import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  private salt: number | string;

  constructor() {
    this.salt = Number(process.env.CRYPT_SALT) || 4;
  }

  async hash(data: string) {
    return await bcrypt.hash(data, 4);
  }

  async compare(sourceValue: string, hash: string) {
    return await bcrypt.compare(sourceValue, hash);
  }

  async getSalt() {
    return process.env.CRYPT_SALT;
  }
}
