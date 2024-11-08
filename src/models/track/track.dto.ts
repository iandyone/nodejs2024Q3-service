import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Track } from 'src/types';

export class TrackDto implements Track {
  @IsString()
  @ApiProperty({
    description: 'Unique identifier of the track (UUID)',
    example: 'a34be6de-a98c-4c13-be97-573d68ba4c6d',
  })
  id: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({
    description: 'Name of the track',
    minLength: 4,
    example: 'Song Title',
  })
  name: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Duration of the track in milliseconds',
    minimum: 1,
    example: 180,
  })
  duration: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({
    description:
      'ID of the album the track belongs to, or null if not applicable (UUID)',
    nullable: true,
    example: 'album-1234',
  })
  albumId: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  @ApiProperty({
    description:
      'ID of the artist who created the track, or null if not applicable (UUID)',
    nullable: true,
    example: 'a34be6de-a98c-4c13-be97-573d68ba4c6d',
  })
  artistId: string | null;
}
