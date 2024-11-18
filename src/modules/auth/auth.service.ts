import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/models/auth/signup.dto';
import { UsersService } from '../users/users.service';
import { HashService } from '../hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from 'src/models/auth/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

    return {
      access_token: await this.jwtService.signAsync(
        { ...accessTokenDto },
        { secret: process.env.JWT_SECRET_KEY },
      ),
    };
  }

  async refresh() {
    return true;
  }
}
