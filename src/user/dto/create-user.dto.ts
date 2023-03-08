import { Type } from 'class-transformer';
import {
  IsEmail,
  IsObject,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from './';
import { Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  // @IsStrongPassword()
  // password: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  location: LocationDto;

}
