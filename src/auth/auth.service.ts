import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { notWithinArray } from 'src/utils/notWithinArray';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { OfferService } from './../offer/offer.service';
import { statusList } from './../offer/types/status.type';
import { UpdateOfferDto } from './../offer/dto/update-offer.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly offerService: OfferService,
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
    const user = await this.authModel.findById(term);

    if (!user) {
      throw new NotFoundException(
        `Could not find user "${term}". Check that either the id is correct.`,
      );
    }
    return user;
  }

  async update(term: string, updateAuthDto: UpdateAuthDto) {
    let user = await this.findOne(term);

    try {
      if (updateAuthDto.offersTaken) {
        const newOffer = await this.offerService.findOne(
          updateAuthDto.offersTaken,
        );

        const offerList = user.offersTaken;
        notWithinArray(offerList, newOffer.id, 'offersTaken');

        const updateOffer: UpdateOfferDto = {
          status: statusList[1],
          taker: user._id,
        };

        await this.offerService.update(newOffer, updateOffer);

        user = await this.authModel.findByIdAndUpdate(
          term,
          {
            $push: { offersTaken: newOffer },
          },
          { new: true },
        );
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
