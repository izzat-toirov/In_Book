import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateAudioBookDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the book version',
  })
  @IsNumber({})
  @IsPositive()
  book_version_id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the narrator',
  })
  @IsString()
  @IsNotEmpty()
  narrator_name: string;

  @ApiProperty({
    example: 3600,
    description: 'Total duration in seconds',
  })
  @IsNumber({})
  @IsPositive()
  total_duration: number;

  @ApiProperty({
    example: 150,
    description: 'Total size in megabytes',
  })
  @IsNumber({})
  @IsPositive()
  total_size_mb: number;
}
