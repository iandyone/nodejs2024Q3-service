import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/models/user/create-user.dto';
import { UserResponseDto } from 'src/models/user/user-response.dto';
import { UpdateUserPassDto } from 'src/models/user/update-password.dto';
import { DatabaseService } from 'src/modules/database/database.service';
import { User } from 'src/types';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async findUserById(id: string) {
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

  async findAll() {
    const users = await this.database.findAllUsers();

    return users.map((user) => this.getResponseData(user));
  }

  async findOne(id: string) {
    const user = await this.findUserById(id);

    return this.getResponseData(user);
  }

  async create(dto: CreateUserDto) {
    const userDto = await this.database.createUser(dto);

    return this.getResponseData(userDto);
  }

  async update(id: string, { newPassword, oldPassword }: UpdateUserPassDto) {
    const { password } = await this.findUserById(id);

    if (oldPassword !== password) {
      throw new ForbiddenException('Invalid user password');
    }

    const userDto = await this.database.updateUser(id, {
      password: newPassword,
    });

    return this.getResponseData(userDto);
  }

  async remove(id: string) {
    const user = await this.findUserById(id);

    return await this.database.removeUser(user.id);
  }

  getResponseData(dto: Partial<User>) {
    const response = new UserResponseDto(dto);
    return { ...response };
  }
}
