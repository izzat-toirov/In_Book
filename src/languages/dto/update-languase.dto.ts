import { PartialType } from '@nestjs/swagger';
import { CreateLanguaseDto } from './create-languase.dto';

export class UpdateLanguaseDto extends PartialType(CreateLanguaseDto) {}
