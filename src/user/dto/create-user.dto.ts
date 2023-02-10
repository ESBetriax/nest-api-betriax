import { Type } from 'class-transformer';
import {
  IsEmail,
  IsObject,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from './';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  // @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
  //   message:
  //     'Password must be at least 8 characters. It must contain at least a lowercase, an uppercase, a number and a special characer.',
  // })
  // password: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location: LocationDto;
}
