import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { Model } from 'mongoose';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

import { notWithinArray } from 'src/utils/notWithinArray';

import { CommonService } from 'src/common/common.service';
import { OfferService } from 'src/offer/offer.service';
import { UpdateOfferDto } from 'src/offer/dto/update-offer.dto';
import { statusList } from './../offer/types/status.type';
import { forwardRef } from '@nestjs/common/utils';
import { Inject } from '@nestjs/common/decorators';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @Inject(forwardRef(() => OfferService))
    private readonly offerService: OfferService,
    private readonly commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      let user: User = await this.userModel.create(createUserDto);

      user = user.toObject();
      delete user.password;

      return user;
    } catch (error) {
      this.commonService.handleExceptions(error, 'A user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findOne(term: string) {
    const user = await this.userModel.findById(term);

    if (!user) {
      throw new NotFoundException(
        `Could not find user "${term}". Check that either the id is correct.`,
      );
    }
    return user;
  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    let user = await this.findOne(term);

    try {
      if (updateUserDto.offersTaken) {
        const newOffer = await this.offerService.findOne(
          updateUserDto.offersTaken,
        );

        const offerList = user.offersTaken;
        notWithinArray(offerList, newOffer.id, 'offersTaken');

        if (newOffer.status !== 'PENDING')
          throw new BadRequestException(
            `The offer ${newOffer._id} has already been taken.`,
          );

        const updateOffer: UpdateOfferDto = {
          status: statusList[1],
          taker: user._id,
        };

        await this.offerService.update(newOffer, updateOffer);

        user = await this.userModel.findByIdAndUpdate(
          term,
          {
            $push: { offersTaken: newOffer },
          },
          { new: true },
        );
      }
      return user;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
