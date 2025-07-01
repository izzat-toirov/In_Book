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

@Module({
  imports: [
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
      models: [User, Genre, Languase, Author, Categories],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
