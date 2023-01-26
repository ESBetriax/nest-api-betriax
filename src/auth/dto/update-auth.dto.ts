import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsMongoId } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsMongoId()
  offersTaken: string;
}
