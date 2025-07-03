import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUptade } from './bot.uptade';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { Library } from './library/model/library.model';
import { LibraryService } from './library/library.service';
import { LibraryUptade } from './library/library.uptade copy';

@Module({
  imports:[SequelizeModule.forFeature([Bot, Library])],
  controllers: [],
  providers: [BotService, LibraryService, LibraryUptade, BotUptade],
  exports: [BotService],
})
export class BotModule {}
