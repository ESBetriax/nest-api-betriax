import { IsEmail, IsIn } from 'class-validator';
import { Role, roleList } from './../types/role.type';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsIn(roleList)
  role: Role;
}
