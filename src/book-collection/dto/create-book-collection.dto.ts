import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateBookCollectionDto {
  @ApiProperty({ example: 1, description: 'ID of the collection' })
  @IsNumber()
  collectionId: number;

  @ApiProperty({ example: 42, description: 'ID of the book to add to the collection' })
  @IsNumber()
  bookId: number;
}
