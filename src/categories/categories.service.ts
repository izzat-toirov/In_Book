import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories) private categoriesModel: typeof Categories){}
   async create(createCategoryDto: CreateCategoryDto) {
     return await this.categoriesModel.create(createCategoryDto);
   }
 
   async findAll() {
     return await this.categoriesModel.findAll({include: {all:true}});
   }
 
   async findOne(id: number) {
     return await this.categoriesModel.findByPk(id);
   }
 
   async update(id: number, updateCategoryDto: UpdateCategoryDto) {
     return await this.categoriesModel.update(updateCategoryDto, {
       where: {id}, returning: true
     });
   }
 
   async remove(id: number) {
     const deleted = await this.categoriesModel.destroy({where: {id}});
     if(deleted === 0){
       throw new NotFoundException(`Categories with ID ${id} not found`);
     }
     return {message: "Deleted successfuly"};
   }
}
