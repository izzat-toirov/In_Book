import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";

import { Context, Markup, Telegraf } from "telegraf";
import { BOT_NAME } from "../app.constants";
import { Library } from "./library/model/library.model";
import { Op } from "sequelize";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot)
    private readonly botModel: typeof Bot,
    @InjectModel(Library)
    private readonly libraryModel: typeof Library,
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          username: ctx.from?.username!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          language_code: ctx.from?.language_code!,
        });
        await ctx.replyWithHTML(
          `iltimos Account ni foaollashtirish uchun<b>☎️ telefon raqamni yuborrish </b>tugmasini bosing `,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("☎️ telefon raqamni yuborrish")],
            ]).resize(),
          }
        );
      } else if (!user.status) {
        await ctx.replyWithHTML(
          `iltimos Account ni foaollashtirish uchun<b>☎️ telefon raqamni yuborrish </b>tugmasini bosing `,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("☎️ telefon raqamni yuborrish")],
            ]).resize(),
          }
        );
      } else {
        await ctx.replyWithHTML(
          `Ushbu bot Inbook Premium foydalanucchilari uchun kitop izlash imkonini beradai`,
          {
            ...Markup.keyboard([["📚Kutubxona", "📕Kitib"]]).resize(),
          }
        );
    }
} catch (error) {
      console.log(`Error on Start ()======||:::::::::::::::> ${error}`);
    }
  }
  
  async onContact(ctx: Context) {
      try {
          if ("contact" in ctx.message!) {
              const user_id = ctx.from?.id;
              const user = await this.botModel.findByPk(user_id);
              if (!user) {
                  await ctx.replyWithHTML(
                      `iltimos <b> /start </b> tugmasini bosing `,
                      {
              ...Markup.keyboard([
                ["/start"]
            ]).resize(),
        }
    );
}else if (ctx.message.contact.user_id != user_id){
            await ctx.replyWithHTML(
                `iltimos Account ni foaollashtirish uchun ozingizni telefon raqamingizni yuboring va <b>☎️ telefon raqamni yuborrish </b>tugmasini bosing `,
                {
                    ...Markup.keyboard([
                        [
                            Markup.button.contactRequest(
                                "☎️ telefon raqamni yuborrish"
                    ),
                  ],
                ]).resize(),
            }
        );
        }else{
            let phone = ctx.message.contact.phone_number;
            // phone = (phone[0]!="+"? "+" + phone: phone)
            user.phone_number = phone[0] != "+" ? "+" + phone : phone;
            user.status = true
            await user.save()
            await ctx.replyWithHTML(
              `Tabriklayman siz siz muafqiyatli faolashtirildingiz ✅`,
              {
                ...Markup.removeKeyboard(),
              }
            );
        }
      }
    } catch (error) {
      console.log(`Error on Contact ()======||:::::::::::::::> ${error}`);
    }
}

async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Siz avval ro'yxatdan o'tmagansiz!`, {
          ...Markup.removeKeyboard(),
        });
      } else if (user.status) {
        user.status = false;
        user.phone_number = "";
        await user.save();
        await this.bot.telegram.sendChatAction(user.user_id, "typing")

        await ctx.replyWithHTML(
          `Siz vaqtincha botdan chiqib ketdingiz. Qayta faollashtirish uchun <b>/start</b> tugmasini bosing`,
          {
            ...Markup.keyboard([["/start"]]).resize(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on Stop: `, error);
    }
  }

  async sentOtp(phone_number: string, OTP: string): Promise<boolean | undefined>{
    try {
        const user = await this.botModel.findOne({where: {phone_number}});
        if(!user || !user.status){
            return false;
        }

        await this.bot.telegram.sendMessage(user.user_id, `verify code ${OTP}`);
        return true
    } catch (error) {
      console.log(`Error on SentOTP:::|||| `, error);
    }

  }

  async onText(ctx: Context){
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Siz avval <b>start</b> tugmasini bosing`, {
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        if("text" in ctx.message!){
          const library = await this.libraryModel.findOne({
            where: {user_id, last_state: {[Op.ne]: "finish"}},
            order: [["id", "DESC"]]
          });
  
          if(library){
            const userInoutTExt = ctx.message.text;
            switch (library.last_state) {
              case "name":
                library.name = userInoutTExt
                library.last_state = "address";
                await library.save();
                await ctx.replyWithHTML("Kutubxona manzilini kiriting: ");
                break;
                case "address":
                library.address = userInoutTExt
                library.last_state = "loaction";
                await library.save();
                await ctx.replyWithHTML("Kutubxona manzilini locationi yuboring: ", {
                  ...Markup.keyboard([[Markup.button.locationRequest("Manzilni tanglang: ")]]).resize(),
                });
                break;
                case "phone_number":
                  library.phone_number = userInoutTExt
                  library.last_state = "finish";
                  await library.save();
                  await ctx.replyWithHTML("Yangi kutubxona qoshildi", {
                    ...Markup.keyboard([[
                      "Yangi kutubxona qoshish", "Barcha kutubxonalar"
                    ]]).resize()
                  });
                  break;
            
              default:
                break;
            }
          }
        }
      }
     
    } catch (error) {
      console.log(`Error on Text:::|||| `, error);
    }

  }

  async onLocation (ctx: Context){
    try {
      if("location" in ctx.message!){

        const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Siz avval <b>start</b> tugmasini bosing`, {
          ...Markup.keyboard([["/start"]]).resize(),
        });
      } else {
        const library = await this.libraryModel.findOne({
          where: {user_id, last_state: "location"},
          order: [["id", "DESC"]]
        });

        if(library){
          library.location = ctx.message.location.latitude+","+
          ctx.message.location.longitude;
          library.last_state = "phone_number";
          await library.save();
          await ctx.replyWithHTML("Kutubxona telefonini kiriting: ", {
            ...Markup.removeKeyboard(),
          });
        }
      }


        await ctx.reply(String(ctx.message.location.latitude));
        await ctx.reply(String(ctx.message.location.longitude));
        await ctx.replyWithLocation(
          ctx.message.location.latitude,
          ctx.message.location.longitude
        )
      }
    }
     catch (error) {
      console.log(`Error  in location:::`, error);
      
    }
  }

}
