import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/models/auth/signup.dto';
import { Tokens } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() credentials: SignUpDto) {
    return await this.authService.signup(credentials);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() credentials: SignUpDto) {
    return await this.authService.login(credentials);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() { refreshToken }: Pick<Tokens, 'refreshToken'>) {
    return await this.authService.refresh(refreshToken);
  }
}
