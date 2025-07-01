import { Module } from '@nestjs/common';
import { AudioBookService } from './audio_book.service';
import { AudioBookController } from './audio_book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AudioBook } from './entities/audio_book.entity';

@Module({
  imports:[SequelizeModule.forFeature([AudioBook])],
  controllers: [AudioBookController],
  providers: [AudioBookService],
  exports: [AudioBookService],
})
export class AudioBookModule {}
