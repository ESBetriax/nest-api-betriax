import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsIn, IsMongoId, IsOptional } from 'class-validator';
import { Role, roleList } from '../types/role.type';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsOptional()
  @IsMongoId()
  offersTaken: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsIn(roleList)
  @IsOptional()
  role: Role;
}
