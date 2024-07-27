import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tache } from './taches.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TachesService {
  constructor(
    @InjectRepository(Tache) private tachesRepository: Repository<Tache>,
  ) {}

  getTaches(): Promise<Tache[]> {
    return this.tachesRepository.find();
  }

  getTache(id: number): Promise<Tache> {
    return this.tachesRepository.findOneBy({ id });
  }

  creerTache(tache: Tache): Promise<Tache> {
    return this.tachesRepository.save(tache);
  }

  async modifierTache(
    id: number,
    updateTacheDto: Partial<Tache>,
  ): Promise<Tache> {
    await this.tachesRepository.update(id, updateTacheDto);
    return this.tachesRepository.findOneBy({ id });
  }

  async supprimerTache(id: number): Promise<void> {
    await this.tachesRepository.delete(id);
  }
}
