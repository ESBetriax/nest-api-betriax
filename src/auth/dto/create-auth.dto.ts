import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Role, roleList } from './../types/role.type';
import { LocationDto } from './location.dto';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  // @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
  //   message:
  //     'Password must be at least 8 characters. It must contain at least a lowercase, an uppercase, a number and a special characer.',
  // })
  // password: string;

  @IsIn(roleList)
  @IsOptional()
  role: Role;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location: LocationDto;
}
