import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID raqami' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: '2025-07-01', description: 'Obuna boshlanish sanasi (startDate)' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ example: '2025-12-31', description: 'Obuna tugash sanasi (endDate)' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
