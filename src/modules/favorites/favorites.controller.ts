import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  async removeTrack(@Param('id') id: string) {
    return await this.favoritesService.removeTrack(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string) {
    return await this.favoritesService.removeArtist(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string) {
    return await this.favoritesService.removeAlbum(id);
  }
}
