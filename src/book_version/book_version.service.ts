import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookVersionDto } from './dto/create-book_version.dto';
import { UpdateBookVersionDto } from './dto/update-book_version.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookVersion } from './entities/book_version.entity';

@Injectable()
export class BookVersionService {
  constructor(@InjectModel(BookVersion) private bookVersionModel: typeof BookVersion){}
      async create(createBookVersionDto: CreateBookVersionDto) {
        return await this.bookVersionModel.create(createBookVersionDto);
      }
    
      async findAll() {
        return await this.bookVersionModel.findAll({include: {all:true}});
      }
    
      async findOne(id: number) {
        return await this.bookVersionModel.findByPk(id);
      }
    
      async update(id: number, UpdateBookVersionDto: UpdateBookVersionDto) {
        return this.bookVersionModel.update(UpdateBookVersionDto, {
          where: {id}, returning:true
        });
      }
    
      async remove(id: number) {
        const deleted = await this.bookVersionModel.destroy({where: {id}});
        if(deleted === 0){
          throw new NotFoundException(`Languase with ${id} not found`);
        }
        return {message: 'Deleted succussfuly'};
      }
}
