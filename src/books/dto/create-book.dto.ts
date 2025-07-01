import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: '2020-05-15',
    description: 'Year of publication (date format)',
  })
  @IsDateString()
  publisher_year: Date;

  @ApiProperty({
    example: 1,
    description: 'ID of the author',
  })
  @IsNumber()
  @IsPositive()
  authorId: number;
}
