import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './models/genre.entity';
import { where } from 'sequelize';

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre) private genreModel: typeof Genre){}
  async create(createGenreDto: CreateGenreDto) {
    return await this.genreModel.create(createGenreDto);
  }

  async findAll() {
    return await this.genreModel.findAll({include: {all:true}});
  }

  async findOne(id: number) {
    return await this.genreModel.findByPk(id);
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    return await this.genreModel.update(updateGenreDto, {
      where: {id}, returning: true
    });
  }

  async remove(id: number) {
    const deleted = await this.genreModel.destroy({where: {id}});
    if(deleted === 0){
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return {message: "Deleted successfuly"};
  }
}
