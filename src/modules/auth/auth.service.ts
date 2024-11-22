import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from 'src/models/auth/signup.dto';
import { UsersService } from '../users/users.service';
import { HashService } from '../hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from 'src/models/auth/token.dto';
import { TokenData, TokenPayload, Tokens } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async createTokens({ userId, login }: TokenPayload): Promise<Tokens> {
    const data = { userId, login };

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(credentials: SignUpDto) {
    const user = await this.userService.create(credentials);

    return user;
  }

  async login({ login, password }: SignUpDto) {
    const user = await this.userService.isExists(login);

    if (!user) {
      throw new ForbiddenException(`There is no user with login ${login}`);
    }

    const isPasswordCorrect = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException(`Wrong user password`);
    }

    const accessTokenDto = new TokenDto(user);

    return await this.createTokens({ ...accessTokenDto });
  }

  async refresh(token: string | undefined) {
    if (!token) {
      throw new UnauthorizedException('No refresh token passed');
    }

    try {
      const isTokenValid = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      if (!isTokenValid) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const dto = this.jwtService.decode(token) as TokenData;

      return await this.createTokens({ ...dto });
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
