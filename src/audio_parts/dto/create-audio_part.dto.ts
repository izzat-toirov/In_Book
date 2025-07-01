import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsUrl,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateAudioPartDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the related audio book',
  })
  @IsNumber({})
  @IsPositive()
  audio_book_id: number;

  @ApiProperty({
    example: 'Chapter 1: The Beginning',
    description: 'Title of the audio part',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'https://example.com/audio/chapter1.mp3',
    description: 'URL of the audio file',
  })
  @IsString()
  @IsUrl({})
  file_url: string;

  @ApiProperty({
    example: 300,
    description: 'Duration of the part in seconds',
  })
  @IsNumber({})
  @IsPositive()
  duration: number;

  @ApiProperty({
    example: 5.2,
    description: 'Size of the part in megabytes',
  })
  @IsNumber({})
  @IsPositive()
  size_mb: number;

  @ApiProperty({
    example: 1,
    description: 'Order index of the audio part',
  })
  @IsNumber({})
  @IsPositive()
  order_index: number;
}
