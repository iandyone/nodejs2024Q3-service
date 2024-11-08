import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Album } from 'src/types';

export class AlbumDto implements Album {
  @IsString()
  @ApiProperty({ description: 'Unique identifier of the album (UUID)' })
  id: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ description: 'Name of the album', minLength: 4 })
  name: string;

  @IsNumber()
  @Min(1700)
  @ApiProperty({ description: 'Year of release', minimum: 1700 })
  year: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({ description: 'ID of the artist (UUID)', nullable: true })
  artistId: string | null;
}
