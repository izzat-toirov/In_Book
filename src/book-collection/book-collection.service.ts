import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book-collection.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookCollection } from './entities/book-collection.entity';

@Injectable()
export class BookCollectionService {
   constructor(@InjectModel(BookCollection) private bookCollectionModel: typeof BookCollection){}
    async create(createBookCollectionDto: CreateBookCollectionDto) {
        return await this.bookCollectionModel.create(createBookCollectionDto);
      }
    
      async findAll() {
        return await this.bookCollectionModel.findAll({include: {all:true}});
      }
    
      async findOne(id: number) {
        return await this.bookCollectionModel.findByPk(id);
      }
    
      async update(id: number, updateBookCollectionDto: UpdateBookCollectionDto) {
        return this.bookCollectionModel.update(updateBookCollectionDto, {
          where: {id}, returning:true
        });
      }
    
      async remove(id: number) {
        const deleted = await this.bookCollectionModel.destroy({where: {id}});
        if(deleted === 0){
          throw new NotFoundException(`Languase with ${id} not found`);
        }
        return {message: 'Deleted succussfuly'};
      }
}
