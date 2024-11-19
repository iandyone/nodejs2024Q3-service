import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from 'src/models/album/create-album.dto';
import { UpdateAlbumDto } from 'src/models/album/update-album.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumsService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumsService.remove(id);
  }
}
