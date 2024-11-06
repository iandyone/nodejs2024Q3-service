import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/models/user/create.dto';
import { UserResponseDto } from 'src/models/user/response.dto';
import { UpdateUserPassDto } from 'src/models/user/update-password.dto';
import { DatabaseService } from 'src/modules/database/database.service';
import { User } from 'src/types';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  async getAll() {
    const users = await this.database.getAllUsers();

    return users.map((user) => this.getResponseData(user));
  }

  async getUser(id: string) {
    const user = await this.getUserById(id);

    return this.getResponseData(user);
  }

  async getUserById(id: string) {
    const isUserIdValid = uuid.validate(id);

    if (!isUserIdValid) {
      throw new BadRequestException('User id is now a valid uuid');
    }

    const user = await this.database.findUser(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const userDto = await this.database.createUser(dto);

    return this.getResponseData(userDto);
  }

  async updateUserPassword(
    id: string,
    { newPassword, oldPassword }: UpdateUserPassDto,
  ) {
    const { password } = await this.getUserById(id);

    if (oldPassword !== password) {
      throw new ForbiddenException('Invalid user password');
    }

    const userDto = await this.database.updateUser(id, {
      password: newPassword,
    });

    return this.getResponseData(userDto);
  }

  async deleteUser(id: string) {
    const isUserExists = await this.getUserById(id);

    if (!isUserExists) {
      throw new BadRequestException(`User with ${id} not found`);
    }

    return await this.database.deleteUser(id);
  }

  getResponseData(dto: Partial<User>) {
    const response = new UserResponseDto(dto);
    return { ...response };
  }
}
