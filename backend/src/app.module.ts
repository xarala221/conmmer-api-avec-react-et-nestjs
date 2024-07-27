import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TachesController } from './taches/taches.controller';
import { TachesService } from './taches/taches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TachesModule } from './taches/taches.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'tache_nest',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TachesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
