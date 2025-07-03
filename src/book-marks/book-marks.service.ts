import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookMarkDto } from './dto/create-book-mark.dto';
import { UpdateBookMarkDto } from './dto/update-book-mark.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookMark } from './entities/book-mark.entity';

@Injectable()
export class BookMarksService {
  constructor(@InjectModel(BookMark) private bookMarkModel: typeof BookMark){}
     async create(createBookMarkDto: CreateBookMarkDto) {
       return await this.bookMarkModel.create(createBookMarkDto);
     }
   
     async findAll() {
       return await this.bookMarkModel.findAll({include: {all:true}});
     }
   
     async findOne(id: number) {
       return await this.bookMarkModel.findByPk(id);
     }
   
     async update(id: number, updateBookMarkDto: UpdateBookMarkDto) {
       return this.bookMarkModel.update(updateBookMarkDto, {
         where: {id}, returning:true
       });
     }
   
     async remove(id: number) {
       const deleted = await this.bookMarkModel.destroy({where: {id}});
       if(deleted === 0){
         throw new NotFoundException(`Languase with ${id} not found`);
       }
       return {message: 'Deleted succussfuly'};
     }
}
