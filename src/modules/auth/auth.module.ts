import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
