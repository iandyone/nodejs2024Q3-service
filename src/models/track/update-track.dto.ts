import { PartialType } from '@nestjs/mapped-types';
import { TrackDto } from './track.dto';

export class UpdateTrackDto extends PartialType(TrackDto) {}
