import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsUrl,
  IsPositive,
} from 'class-validator';

export class CreateBookVersionDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the book',
  })
  @IsNumber()
  @IsPositive()
  book_id: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the language',
  })
  @IsNumber()
  @IsPositive()
  language_id: number;

  @ApiProperty({
    example: 'The Great Adventure - Uzbek',
    description: 'Title of the book version',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://example.com/books/great_adventure.pdf',
    description: 'URL to the book file',
  })
  @IsString()
  @IsUrl()
  file_url: string;

  @ApiProperty({
    example: 'This version includes extra commentary in Uzbek.',
    description: 'Description of the book version',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'https://example.com/books/great_adventure.txt',
    description: 'URL to the plain text version of the book',
  })
  @IsString()
  @IsUrl()
  text_url: string;

  @ApiProperty({
    example: 'https://example.com/images/covers/great_adventure.jpg',
    description: 'URL to the cover image',
  })
  @IsString()
  @IsUrl()
  cover_url: string;
}
