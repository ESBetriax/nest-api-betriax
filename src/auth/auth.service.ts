import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const auth = await this.authModel.create(createAuthDto);
      return auth;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(term: string) {
    let user: Auth;

    if (isValidObjectId(term)) {
      user = await this.authModel.findById(term);
    }

    if (!user) {
      throw new NotFoundException(
        `Could not find the user "${term}". Check that either the name or id is correct.`,
      );
    }
    return user;
  }

  async update(term: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.findOne(term);

    try {
      if (updateAuthDto.offersTaken) {
        await user.updateOne({
          ordersTaken: [...user.ordersTaken, updateAuthDto.offersTaken],
        });
      }
    } catch (error) {
      throw new Error('error');
    }

    return `This action updates a #${term} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private handleExceptions(error: any) {
    console.error(error.message);
    if (error.code === 11000) {
      throw new BadRequestException(
        `A user with that email already exists in the database ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    throw new InternalServerErrorException(
      `Could not authenticate. ${error.message}`,
    );
  }
}
