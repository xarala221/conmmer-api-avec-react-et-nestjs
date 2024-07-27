import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TachesService } from './taches.service';
import { Tache } from './taches.entity';

@Controller('taches')
export class TachesController {
  constructor(private readonly tacheServices: TachesService) {}

  @Get()
  async getTaches() {
    return await this.tacheServices.getTaches();
  }

  @Get(':id')
  async getTache(@Param('id') id: string) {
    return await this.tacheServices.getTache(+id);
  }

  @Post()
  create(@Body() createTacheDto: Tache): Promise<Tache> {
    return this.tacheServices.creerTache(createTacheDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBookDto: Partial<Tache>,
  ): Promise<Tache> {
    return this.tacheServices.modifierTache(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tacheServices.supprimerTache(id);
  }
}
