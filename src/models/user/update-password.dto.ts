import { IsString, MinLength } from 'class-validator';

export class UpdateUserPassDto {
  @MinLength(4)
  @IsString()
  oldPassword: string;

  @MinLength(4)
  @IsString()
  newPassword: string;
}
