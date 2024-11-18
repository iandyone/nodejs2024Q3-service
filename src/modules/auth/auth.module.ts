import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET_KEY,
        secretOrPrivateKey: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
