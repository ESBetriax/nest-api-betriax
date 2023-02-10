import { IsStrongPassword } from 'class-validator';
import { CreateUserDto } from './../../user/dto/create-user.dto';

export class CreateAuthDto extends CreateUserDto {
  @IsStrongPassword()
  password: string;
}
