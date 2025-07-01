import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './entities/author.entity';

@Module({
  imports:[SequelizeModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
