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
  id: string;

  @IsString()
  @MinLength(4)
  name: string;

  @IsNumber()
  @Min(1700)
  year: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
