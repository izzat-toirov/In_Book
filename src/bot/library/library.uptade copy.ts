
import { Context, Markup } from 'telegraf';
import { BotService } from '../bot.service';
import { Action, Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { LibraryService } from './library.service';

@Update()
export class LibraryUptade {
  constructor(private readonly libraryService: LibraryService) {}

  
}