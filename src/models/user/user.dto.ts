import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { User } from 'src/types';

export class UserDto implements User {
  @IsString()
  id: string;

  @IsString()
  @MinLength(4)
  login: string;

  @MinLength(4)
  @IsString()
  password: string;

  @Min(1)
  @IsNumber()
  version: number;

  @IsNumber()
  createdAt: number;

  @IsString()
  updatedAt: number;
}
