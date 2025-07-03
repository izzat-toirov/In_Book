import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsNumber, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { HasMany } from "sequelize-typescript";
import { BookMark } from "../../book-marks/entities/book-mark.entity";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  birth_year: number;


}
