import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from './entities/book.entity';
import { UpdateAudioBookDto } from '../audio_book/dto/update-audio_book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Books) private booksModel: typeof Books){}
    async create(createBookDto: CreateBookDto) {
      return await this.booksModel.create(createBookDto);
    }
  
    async findAll() {
      return await this.booksModel.findAll({include: {all:true}});
    }
  
    async findOne(id: number) {
      return await this.booksModel.findByPk(id);
    }
  
    async update(id: number, updateBookDto: UpdateBookDto) {
      return this.booksModel.update(updateBookDto, {
        where: {id}, returning:true
      });
    }
  
    async remove(id: number) {
      const deleted = await this.booksModel.destroy({where: {id}});
      if(deleted === 0){
        throw new NotFoundException(`Languase with ${id} not found`);
      }
      return {message: 'Deleted succussfuly'};
    }
}
