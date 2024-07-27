import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tache } from './taches.entity';
import { TachesService } from './taches.service';
import { TachesController } from './taches.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tache])],
  providers: [TachesService],
  controllers: [TachesController],
})
export class TachesModule {}
