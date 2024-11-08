import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({
    description: 'Name of the artist',
    minLength: 4,
    example: 'John Doe',
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Indicates whether the artist has won a Grammy award',
    example: true,
  })
  grammy: boolean;
}
