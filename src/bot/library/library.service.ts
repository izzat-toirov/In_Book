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



}
