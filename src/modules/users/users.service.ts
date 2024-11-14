import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/models/user/create-user.dto';
import { UserResponseDto } from 'src/models/user/user-response.dto';
import { UpdateUserPassDto } from 'src/models/user/update-password.dto';
import { User } from 'src/types';
import * as uuid from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { User as UserPrisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getResponseData(dto: Partial<User>) {
    const response = new UserResponseDto(dto);
    return { ...response };
  }

  formatUser(data: UserPrisma) {
    return {
      ...data,
      createdAt: data.createdAt.getTime(),
      updatedAt: data.updatedAt.getTime(),
    };
  }

  async findUserById(id: string) {
    const isUserIdValid = uuid.validate(id);

    if (!isUserIdValid) {
      throw new BadRequestException('User id is now a valid uuid');
    }

    const userData = await this.prisma.user.findUnique({ where: { id } });

    if (!userData) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const user = {
      ...userData,
      createdAt: userData.createdAt.getTime(),
      updatedAt: userData.updatedAt.getTime(),
    };

    return user;
  }

  async findAll() {
    const userData = await this.prisma.user.findMany();
    const users = userData.map((user) => this.formatUser(user));

    return users.map((user) => this.getResponseData(user));
  }

  async findOne(id: string) {
    const user = await this.findUserById(id);

    return this.getResponseData(user);
  }

  async create(dto: CreateUserDto) {
    const userData = await this.prisma.user.create({
      data: { ...dto, version: 1 },
    });

    const user = this.formatUser(userData);

    return this.getResponseData(user);
  }

  async update(id: string, { newPassword, oldPassword }: UpdateUserPassDto) {
    const { password, version } = await this.findUserById(id);

    if (oldPassword !== password) {
      throw new ForbiddenException('Invalid user password');
    }

    const userData = await this.prisma.user.update({
      where: { id },
      data: { password: newPassword, version: version + 1 },
    });

    const user = this.formatUser(userData);

    return this.getResponseData(user);
  }

  async remove(id: string) {
    const user = await this.findUserById(id);

    await this.prisma.user.delete({ where: { id } });

    return user.id;
  }
}
