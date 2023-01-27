import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { notWithinArray } from 'src/utils/notWithinArray';
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
    // let otherUser: Auth[];

    if (isValidObjectId(term)) {
      user = await this.authModel.findById(term);
      // otherUser = await this.authModel.find({
      //   ordersTaken: '63d1bcb1e478276b057a73d9',
      // });
    }

    if (!user) {
      throw new NotFoundException(
        `Could not find the user "${term}". Check that either the name or id is correct.`,
      );
    }
    return user;
    // return otherUser;
  }

  async update(term: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.findOne(term);

    try {
      if (updateAuthDto.offersTaken) {
        const offerList = user.ordersTaken;
        const newOffer = updateAuthDto.offersTaken;

        notWithinArray(offerList, newOffer, 'offersTaken');

        await user.updateOne({
          ordersTaken: [...offerList, newOffer],
        });
      }
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException(error.message);
    }
    return user;
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
