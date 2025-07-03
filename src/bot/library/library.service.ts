import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "../models/bot.model";
import { InjectBot } from "nestjs-telegraf";

import { Context, Markup, Telegraf } from "telegraf";
import { BOT_NAME } from "../../app.constants";
import { Library } from "./model/library.model";

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Bot)
    private readonly botModel: typeof Bot,
    @InjectModel(Library)
    private readonly libraryModel: typeof Library,
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>
  ) {}


 async onLibrary(ctx: Context){
  try {
    await ctx.replyWithHTML("Kerekli menyuni tanlang", {
      ...Markup.keyboard([["Yangi kutubxona qoshish", "Barcha kutubxonalar"]]).resize(),
    })
  } catch (error) {
    console.log(`Eror on library:::::`, error);
    
  }
 }

 async addNewLibrary(ctx: Context){
  try {
    const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Siz avval ro'yxatdan o'tmagansiz!`, {
          ...Markup.removeKeyboard(),
        });
      } else {
        await this.libraryModel.create({
          user_id: user_id!,
          last_state:"name",
        });
      }

    await ctx.replyWithHTML("Yangi kutubxona kiriting", {
      ...Markup.removeKeyboard(),
    })
  } catch (error) {
    console.log(`Eror on library:::::`, error);
    
  }
 }
}
