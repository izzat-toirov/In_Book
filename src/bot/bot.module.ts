import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUptade } from './bot.uptade';

@Module({
  controllers: [],
  providers: [BotService, BotUptade],
})
export class BotModule {}
