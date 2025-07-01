import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

// import { join } from "path";
import { UsersModule } from './users/users.module';
import { User } from "./users/models/user.model";
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { GenreModule } from './genre/genre.module';
import { Genre } from "./genre/models/genre.entity";
import { LanguaseModule } from './languages/languase.module';
import { Languase } from "./languages/entities/languase.entity";
import { AuthorsModule } from './authors/authors.module';
import { Author } from "./authors/entities/author.entity";
import { CategoriesModule } from './categories/categories.module';
import { Categories } from "./categories/entities/category.entity";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { BotModule } from './bot/bot.module';
import { AudioBookModule } from './audio_book/audio_book.module';
import { AudioBook } from "./audio_book/entities/audio_book.entity";
import { AudioPartsModule } from './audio_parts/audio_parts.module';
import { AudioPart } from "./audio_parts/entities/audio_part.entity";
import { BookVersionModule } from './book_version/book_version.module';
import { BookVersion } from "./book_version/entities/book_version.entity";
import { BooksModule } from './books/books.module';
import { Books } from "./books/entities/book.entity";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: ()=>({
        token:process.env.BOT_TOKEN!,
        middlewares:[],
        include:[BotModule],
      })
    }),

    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    // ServeStaticModul.forRoot({ rootPath: join(__dirname, "..", "static") }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Genre, Languase, Author, Categories, AudioBook, AudioPart, BookVersion, Books],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true }, //force
    }),
    UsersModule,
    AuthModule,
    MailModule,
    GenreModule,
    LanguaseModule,
    AuthorsModule,
    CategoriesModule,
    BotModule,
    AudioBookModule,
    AudioPartsModule,
    BookVersionModule,
    BooksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
