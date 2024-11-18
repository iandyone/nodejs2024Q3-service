import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HashService } from '../hash/hash.service';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, HashService],
})
export class UsersModule {}
