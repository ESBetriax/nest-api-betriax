import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsIn, IsMongoId, IsOptional } from 'class-validator';
import { Role, roleList } from '../../user/types/role.type';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
