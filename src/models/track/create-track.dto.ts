import { TrackDto } from './track.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateTrackDto extends OmitType(TrackDto, ['id']) {}
