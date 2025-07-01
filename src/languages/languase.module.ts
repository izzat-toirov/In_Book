import { Module } from '@nestjs/common';
import { LanguaseService } from './languase.service';
import { LanguaseController } from './languase.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Languase } from './entities/languase.entity';

@Module({
  imports: [SequelizeModule.forFeature([Languase])],
  controllers: [LanguaseController],
  providers: [LanguaseService],
  exports: [LanguaseService],
})
export class LanguaseModule {}
