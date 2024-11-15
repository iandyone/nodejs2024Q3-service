import { OmitType } from '@nestjs/mapped-types';
import { AlbumDto } from './album.dto';

export class CreateAlbumDto extends OmitType(AlbumDto, ['id']) {}
