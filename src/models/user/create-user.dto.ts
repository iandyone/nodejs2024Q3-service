import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  login: string;

  @MinLength(4)
  @IsString()
  password: string;
}
