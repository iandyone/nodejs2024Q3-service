import { IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  login: string;

  @MinLength(4)
  @IsString()
  password: string;
}
