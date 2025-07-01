import { Module } from '@nestjs/common';
import { AudioPartsService } from './audio_parts.service';
import { AudioPartsController } from './audio_parts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AudioPart } from './entities/audio_part.entity';

@Module({
  imports:[SequelizeModule.forFeature([AudioPart])],
  controllers: [AudioPartsController],
  providers: [AudioPartsService],
})
export class AudioPartsModule {}
