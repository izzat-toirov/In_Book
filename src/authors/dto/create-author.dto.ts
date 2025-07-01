import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    full_name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bio: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    photo_url: string;
}
