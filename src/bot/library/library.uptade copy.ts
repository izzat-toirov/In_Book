
import { Context, Markup } from 'telegraf';
import { BotService } from '../bot.service';
import { Action, Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { LibraryService } from './library.service';

@Update()
export class LibraryUptade {
  constructor(private readonly libraryService: LibraryService) {}

  @Hears("📚Kutubxona")
  async onHearsLibrary(@Ctx() ctx: Context){
    await this.libraryService.onLibrary(ctx);
  }

  @Hears("Yangi kutubxona qoshish")
  async addNewLibrary(@Ctx() ctx: Context){
    await this.libraryService.addNewLibrary(ctx);
  }
}