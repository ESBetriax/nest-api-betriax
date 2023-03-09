import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserPayload } from './interfaces/user-payload.interface';
import { Offer } from './../offer/entities/offer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly commonService: CommonService,
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>,
    @Inject(forwardRef(() => OfferService))
    private readonly offerService: OfferService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserPayload> {
    try {
      const { email, isActive } = await this.userModel.create(createUserDto);

      const userData: UserPayload = { email, isActive };
      return userData;
    } catch (error) {
      this.commonService.handleExceptions(error, 'A user');
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      if (offset > 0) {
        return await this.userModel
          .find()
          .limit(limit)
          .skip((offset - 1) * 10)
          .sort({ no: 1 });
      }
      return await this.userModel
        .find()
        .limit(limit)
        .skip(offset)
        .sort({ no: 1 });
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findOne(term: string) {
    try {
      const user = await this.userModel.findById(term);

      if (!user) {
        throw new NotFoundException(
          `Could not find user "${term}". Check that either the id is correct.`,
        );
      }
      return user;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findOffers(term: string) {
    try {
      const offers = await this.offerModel.find({ creator: term });

      if (!offers) {
        throw new NotFoundException(
          `Could not find user "${term}". Check that either the id is correct.`,
        );
      }
      return offers;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException(
        'Please send at least one property to modify.',
      );
    }

    let user = await this.findOne(term);

    try {
      if (updateUserDto.offersTaken) {
        if (!user.isActive)
          throw new UnauthorizedException(
            'You are not currently allowed to take offers.',
          );

        const newOffer = await this.offerService.findOne(
          updateUserDto.offersTaken,
        );

        if (newOffer.creator.toString() === term)
          throw new BadRequestException(
            'You are trying to take your own offer.',
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
      if (updateUserDto.offersRemove) {
        const offer = await this.offerService.findOne(
          updateUserDto.offersRemove,
        );

        const updateOffer: UpdateOfferDto = {
          status: statusList[6],
        };

        if (
          user._id.valueOf() == offer.creator.valueOf() &&
          offer.status !== 'TAKEN'
        ) {
          await this.offerService.update(offer, updateOffer);
        }
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
