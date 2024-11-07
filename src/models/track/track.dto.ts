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
  id: string;

  @IsString()
  @MinLength(4)
  name: string;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
