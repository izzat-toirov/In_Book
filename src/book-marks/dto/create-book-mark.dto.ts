import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookMarkDto {
  @ApiProperty({ example: 1, description: 'User ID raqami' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 10, description: 'Kitob ID raqami' })
  @IsNumber()
  bookId: number;

  @ApiProperty({ example: 'Chapter 3', description: 'Eslatma haqida qisqacha ma\'lumot' })
  @IsString()
  noti: string;

  @ApiProperty({ example: 'Page 45', description: 'Kitobdagi pozitsiya (sahifa yoki bo\'lim)' })
  @IsString()
  position: string;
}
