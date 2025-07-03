import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
   constructor(@InjectModel(Subscription) private subscriptionModel: typeof Subscription){}
      async create(CreateSubscriptionDto: CreateSubscriptionDto) {
        return await this.subscriptionModel.create(CreateSubscriptionDto);
      }
    
      async findAll() {
        return await this.subscriptionModel.findAll({include: {all:true}});
      }
    
      async findOne(id: number) {
        return await this.subscriptionModel.findByPk(id);
      }
    
      async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
        return this.subscriptionModel.update(updateSubscriptionDto, {
          where: {id}, returning:true
        });
      }
    
      async remove(id: number) {
        const deleted = await this.subscriptionModel.destroy({where: {id}});
        if(deleted === 0){
          throw new NotFoundException(`Languase with ${id} not found`);
        }
        return {message: 'Deleted succussfuly'};
      }
}
