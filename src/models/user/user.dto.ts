import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { User } from 'src/types';

export class UserDto implements User {
  @IsString()
  @ApiProperty({
    description: 'Unique identifier of the user (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({
    description: 'Login name of the user',
    minLength: 4,
    example: 'user123',
  })
  login: string;

  @MinLength(4)
  @IsString()
  @ApiProperty({
    description: 'Password of the user',
    minLength: 4,
    example: 'securepassword',
  })
  password: string;

  @Min(1)
  @IsNumber()
  @ApiProperty({
    description: 'Version number of the user record',
    minimum: 1,
    example: 1,
  })
  version: number;

  @IsNumber()
  @ApiProperty({
    description: 'Timestamp of user creation in milliseconds since epoch',
    example: 1627890123456,
  })
  createdAt: number;

  @IsString()
  @ApiProperty({
    description:
      'Timestamp of the last update to the user record in milliseconds since epoch',
    example: 1627890123456,
  })
  updatedAt: number;
}
