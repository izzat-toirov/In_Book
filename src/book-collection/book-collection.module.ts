import { Module } from '@nestjs/common';
import { BookCollectionService } from './book-collection.service';
import { BookCollectionController } from './book-collection.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookCollection } from './entities/book-collection.entity';

@Module({
  imports: [SequelizeModule.forFeature([BookCollection])],
  controllers: [BookCollectionController],
  providers: [BookCollectionService],
})
export class BookCollectionModule {}
