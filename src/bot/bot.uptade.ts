
import { Context, Markup } from 'telegraf';
import { BotService } from './bot.service';
import { Action, Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';

@Update()
export class BotUptade {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context){
    await this.botService.start(ctx);
  }

  @On("contact")
  async oncontact(@Ctx() ctx: Context){
      await this.botService.onContact(ctx)
  }

@Command("stop")
async onStop(@Ctx() ctx: Context){
  await this.botService.onStop(ctx)
}

@On("text")
async onText(@Ctx() ctx: Context){
  await this.botService.onText(ctx);
}

@On("location")
async onLocation(@Ctx() ctx: Context){
  await this.botService.onLocation(ctx);
}

}


// if("location" in ctx.message!){
//   // console.log(ctx.message.contact);
//   await ctx.reply(String(ctx.message.location.latitude));
//   await ctx.reply(String(ctx.message.location.longitude));
//   await ctx.replyWithLocation(
//     ctx.message.location.latitude,
//     ctx.message.location.longitude
//   )
// }
//   @On("photo")
//   async onPhoto(@Ctx() ctx: Context){
//     if("photo" in ctx.message!){
//       console.log(ctx.message.photo);
//       await ctx.replyWithPhoto(String(ctx.message.photo[ctx.message.photo.length-1].file_id))
//     }
//   }

//   @On("video")
//   async onVideo(@Ctx() ctx: Context){
//     if("video" in ctx.message!){
//       console.log(ctx.message.video);
//       await ctx.replyWithVideo(String(ctx.message.video.file_name))
//     }
//   }

//   @On("sticker")
//   async onSticker(@Ctx() ctx: Context){
//     if("sticker" in ctx.message!){
//       console.log(ctx.message.sticker);
//       await ctx.replyWithSticker(String(ctx.message.sticker.file_id))
//     }
//   }

//   @On("animation")
//   async onAnimation(@Ctx() ctx: Context){
//     if("animation" in ctx.message!){
//       console.log(ctx.message.animation);
//       await ctx.replyWithAnimation(String(ctx.message.animation.file_id))
//     }
//   }

//   @On("contact")
//   async oncontact(@Ctx() ctx: Context){
//     if("contact" in ctx.message!){
//       // console.log(ctx.message.contact);
//       await ctx.reply(String(ctx.message.contact.last_name));
//       await ctx.reply(String(ctx.message.contact.user_id));
//       await ctx.reply(String(ctx.message.contact.phone_number));
//     }
//   }



//   @On("voice")
//   async onvoice(@Ctx() ctx: Context){
//     if("voice" in ctx.message!){
//       // console.log(ctx.message.contact);
//       await ctx.reply(String(ctx.message.voice.duration));
//       await ctx.reply(String(ctx.message.voice.file_id));

//     }
//   }

//   @On("document")
//   async ondocument(@Ctx() ctx: Context){
//     if("document" in ctx.message!){
//       // console.log(ctx.message.contact);
//       await ctx.replyWithDocument(String(ctx.message.document.file_id));
//       await ctx.replyWithDocument(String(ctx.message.document.file_name));

//     }
//   }

//   @Hears("hi")
//   async onHears(@Ctx() ctx: Context) {
//     await ctx.replyWithHTML("HEy there")
//   }
//   @Command("help")
//   async onHelp(@Ctx() ctx: Context) {
//     await ctx.replyWithHTML("HEy 231")
//   }

//   @Command("inline")
//   async onInlie(@Ctx() ctx: Context) {
//     const inlineKeyboards = [
//       [
//         {text: "Product1", 
//           callback_data: "product_1"
//         },
//         {text: "Product2", 
//           callback_data: "product_2"
//         },
//         {text: "Product3", 
//           callback_data: "product_3"
//         }
//       ],
//       [
//         {text: "Product4", 
//           callback_data: "product_4"
//         }
//       ],
//       [
//         {text: "Product7", 
//           callback_data: "product_4"
//         }
//       ]
//     ]
//     await ctx.reply("Kerakli productni tanla: ", {
//       reply_markup: {
//         inline_keyboard: inlineKeyboards,
//       }
//     })
//   }

//   @Action("product_1")
//   async onAct(@Ctx() ctx: Context){
//     await ctx.replyWithHTML("Tanlamdi")
//   }

//   @Action(/product_\d+/)
//   async onACTPRO(@Ctx() ctx: Context){
//     if("data" in ctx.callbackQuery!){
//     const data = ctx.callbackQuery?.data;
//     const peoductId = data.split("_")[1];
//     await ctx.replyWithHTML(`${peoductId} tanlandi`)
//     }
//   }

//   @Command("main")
//   async onMain(@Ctx() ctx: Context){
//     await ctx.replyWithHTML("Keraklin main utton tanla", {
//       ...Markup.keyboard([["Bir", "56"], 
//         ["Ikki"], ["UCH"], ["4"], ["5"],
//       [Markup.button.contactRequest("Telefon raqaminggizni jonatong")],
//       [Markup.button.locationRequest("Location jonatong")]
//       ]).resize().oneTime()
//     })
//   }

//   @Hears("Bir")
//   async on1(@Ctx() ctx: Context) {
//     await ctx.replyWithHTML("Bir bosildi")
//   }

//   @Hears("Ikki")
//   async on2(@Ctx() ctx: Context) {
//     await ctx.replyWithHTML("ikki bosildi")
//   }


// }




 
//   @On("message")
//   async onMessage(@Ctx() ctx: Context){
//     console.log(ctx.botInfo);
//     console.log(ctx.chat);
//     console.log(ctx.chat!.id);
//     console.log(ctx.from);
//     console.log(ctx.from!.id);
    
//   }
// }
