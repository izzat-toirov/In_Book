import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from '../common/guards/user.guard';
import { SelfGuart } from '../common/guards/self.guard';
import { IsCreatorGuard } from '../common/guards/isCreator.guard';
import { PhoneUserDto } from './dto/phone-user.dto';
import { VerifyUserDto } from './dto/verify-otp.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(IsCreatorGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @HttpCode(200)
  @Post("new-otp")
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOTP(phoneUserDto);
  }

  @HttpCode(200)
  @Post("verify-otp")
  verifyOtp(@Body() verifyUserDto: VerifyUserDto) {
    return this.usersService.verifyOtp(verifyUserDto);
  }

  // @UseGuards(IsCreatorGuard)
  // @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(IsCreatorGuard)
  @UseGuards(SelfGuart)
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @UseGuards(IsCreatorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(IsCreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string){
    return this.usersService.activateUser(link)
  }
}
