import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanguaseService } from './languase.service';
import { CreateLanguaseDto } from './dto/create-languase.dto';
import { UpdateLanguaseDto } from './dto/update-languase.dto';

@Controller('languages')
export class LanguaseController {
  constructor(private readonly languaseService: LanguaseService) {}

  @Post()
  create(@Body() createLanguaseDto: CreateLanguaseDto) {
    return this.languaseService.create(createLanguaseDto);
  }

  @Get()
  findAll() {
    return this.languaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLanguaseDto: UpdateLanguaseDto) {
    return this.languaseService.update(+id, updateLanguaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languaseService.remove(+id);
  }
}
