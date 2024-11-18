import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/models/auth/signup.dto';

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

  @Post('refresh')
  async refresh() {
    return await this.authService.refresh();
  }
}
