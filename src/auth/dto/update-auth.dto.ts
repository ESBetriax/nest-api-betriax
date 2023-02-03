import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsOptional()
  @IsMongoId()
  offersTaken: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
