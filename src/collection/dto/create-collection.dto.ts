import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsUrl, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({ example: 'Nature Collection', description: 'Title of the collection' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A collection of nature-themed artworks', description: 'Description of the collection' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL to the cover image' })
  @IsUrl()
  @IsNotEmpty()
  coverImageUrl: string;

  @ApiProperty({ example: 1, description: 'ID of the user who created the collection' })
  @IsNumber()
  createdBy: number;

  @ApiProperty({ example: true, description: 'Whether the collection is public' })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({ example: false, description: 'Whether the collection is only for premium users' })
  @IsBoolean()
  isPremiumOnly: boolean;

  @ApiProperty({ example: false, description: 'Whether the collection is premium content' })
  @IsBoolean()
  isPremium: boolean;
}
