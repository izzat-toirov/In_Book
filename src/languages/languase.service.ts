import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguaseDto } from './dto/create-languase.dto';
import { UpdateLanguaseDto } from './dto/update-languase.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Languase } from './entities/languase.entity';

@Injectable()
export class LanguaseService {
  constructor(@InjectModel(Languase) private languaseModel: typeof Languase){}
  async create(createLanguaseDto: CreateLanguaseDto) {
    return await this.languaseModel.create(createLanguaseDto);
  }

  async findAll() {
    return await this.languaseModel.findAll({include: {all:true}});
  }

  async findOne(id: number) {
    return await this.languaseModel.findByPk(id);
  }

  async update(id: number, updateLanguaseDto: UpdateLanguaseDto) {
    return this.languaseModel.update(updateLanguaseDto, {
      where: {id}, returning:true
    });
  }

  async remove(id: number) {
    const deleted = await this.languaseModel.destroy({where: {id}});
    if(deleted === 0){
      throw new NotFoundException(`Languase with ${id} not found`);
    }
    return {message: 'Deleted succussfuly'};
  }
}
