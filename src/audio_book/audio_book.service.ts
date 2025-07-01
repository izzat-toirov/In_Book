import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAudioBookDto } from './dto/create-audio_book.dto';
import { UpdateAudioBookDto } from './dto/update-audio_book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AudioBook } from './entities/audio_book.entity';

@Injectable()
export class AudioBookService {
   constructor(@InjectModel(AudioBook) private audioModel: typeof AudioBook){}
    async create(createAudioBookDto: CreateAudioBookDto) {
      return await this.audioModel.create(createAudioBookDto);
    }
  
    async findAll() {
      return await this.audioModel.findAll({include: {all:true}});
    }
  
    async findOne(id: number) {
      return await this.audioModel.findByPk(id);
    }
  
    async update(id: number, updateAudioBookDto: UpdateAudioBookDto) {
      return this.audioModel.update(updateAudioBookDto, {
        where: {id}, returning:true
      });
    }
  
    async remove(id: number) {
      const deleted = await this.audioModel.destroy({where: {id}});
      if(deleted === 0){
        throw new NotFoundException(`Languase with ${id} not found`);
      }
      return {message: 'Deleted succussfuly'};
    }
}
