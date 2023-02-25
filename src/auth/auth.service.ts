import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { compareSync, hashSync } from 'bcrypt';

import { CreateAuthDto, LoginAuthDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { CommonService } from '../common/common.service';
import { UserService } from 'src/user/user.service';
import { User } from './../user/entities/user.entity';
import { UserPayload } from '../user/interfaces/user-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password, ...userData } = createAuthDto;

      const user: UserPayload = await this.userService.create({
        ...userData,
        password: hashSync(password, 12),
      });

      return { ...user, token: this.setJwtToken({ email: user.email }) };
    } catch (error) {
      this.commonService.handleExceptions(error, 'A user');
    }
  }

  async login({ email, password }: LoginAuthDto) {
    const user: User = await this.userService.findOne(email);

    if (!user)
      throw new BadRequestException('The email introduced is incorrect.');

    if (!compareSync(user.password, password))
      throw new BadRequestException('The password introduced is incorrect.');

    return 'Logged successfully';
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private setJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
