import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAudioPartDto } from './dto/create-audio_part.dto';
import { UpdateAudioPartDto } from './dto/update-audio_part.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AudioPart } from './entities/audio_part.entity';

@Injectable()
export class AudioPartsService {
  constructor(@InjectModel(AudioPart) private audioPartModel: typeof AudioPart){}
      async create(createAudioPartDto: CreateAudioPartDto) {
        return await this.audioPartModel.create(createAudioPartDto);
      }
    
      async findAll() {
        return await this.audioPartModel.findAll({include: {all:true}});
      }
    
      async findOne(id: number) {
        return await this.audioPartModel.findByPk(id);
      }
    
      async update(id: number, updateAudioPartDto: UpdateAudioPartDto) {
        return this.audioPartModel.update(updateAudioPartDto, {
          where: {id}, returning:true
        });
      }
    
      async remove(id: number) {
        const deleted = await this.audioPartModel.destroy({where: {id}});
        if(deleted === 0){
          throw new NotFoundException(`Languase with ${id} not found`);
        }
        return {message: 'Deleted succussfuly'};
      }
}
