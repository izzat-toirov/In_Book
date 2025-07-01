import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorModel: typeof Author){}
  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorModel.create(createAuthorDto);
  }

  async findAll() {
    return await this.authorModel.findAll({include: {all:true}});
  }

  async findOne(id: number) {
    return await this.authorModel.findByPk(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorModel.update(updateAuthorDto, {
      where: {id}, returning:true
    });
  }

  async remove(id: number) {
    const deleted = await this.authorModel.destroy({where: {id}});
    if(deleted === 0){
      throw new NotFoundException(`Languase with ${id} not found`);
    }
    return {message: 'Deleted succussfuly'};
  }
}
