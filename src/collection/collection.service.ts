import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionService {
      constructor(@InjectModel(Collection) private collectionModel: typeof Collection){}
  async create(createCollectionDto: CreateCollectionDto) {
      return await this.collectionModel.create(createCollectionDto);
    }
  
    async findAll() {
      return await this.collectionModel.findAll({include: {all:true}});
    }
  
    async findOne(id: number) {
      return await this.collectionModel.findByPk(id);
    }
  
    async update(id: number, updateCollectionDto: UpdateCollectionDto) {
      return this.collectionModel.update(updateCollectionDto, {
        where: {id}, returning:true
      });
    }
  
    async remove(id: number) {
      const deleted = await this.collectionModel.destroy({where: {id}});
      if(deleted === 0){
        throw new NotFoundException(`Languase with ${id} not found`);
      }
      return {message: 'Deleted succussfuly'};
    }
}
