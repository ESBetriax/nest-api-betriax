import { Inject, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { compareSync, hashSync } from 'bcrypt';

import { CreateAuthDto, LoginAuthDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { CommonService } from '../common/common.service';
import { UserService } from 'src/user/user.service';
import { User } from './../user/entities/user.entity';
import { UserPayload } from '../user/interfaces/user-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenData, DataStoredInToken } from './interfaces/auth.interface';
import { config } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @Inject(forwardRef(() => UserService))
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

  async login({ email, password }: LoginAuthDto): Promise<any> {
    const user: User = await this.userModel.findOne({ email });

    if (!user)
      throw new BadRequestException('The email introduced is incorrect.');
    if (!compareSync(password, user.password))
      throw new BadRequestException('The password introduced is incorrect.');

    // const tokenData = this.createToken(user);
    // const cookie = this.createCookie(tokenData);
    const cookie = this.setJwtToken({ email: user.email });
    return { user, cookie };
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey = 'secretoDePrueba';
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: this.jwtService.sign(dataStoredInToken, { secret: secretKey }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  private setJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
