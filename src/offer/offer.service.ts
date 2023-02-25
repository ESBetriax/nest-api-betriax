import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { CommonService } from 'src/common/common.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>,
    private readonly commonService: CommonService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    const creator = await this.userService.findOne(createOfferDto.id);
    if (!creator.isActive)
      throw new UnauthorizedException(
        'You are not currently allowed to create offers.',
      );

    try {
      const expiresAt = moment()
        .add(createOfferDto.expiresAt || 1, 'h')
        .toDate();

      const offer = await this.offerModel.create({
        ...createOfferDto,
        expiresAt,
        creator: creator._id,
      });

      return offer;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      const offers = await this.offerModel.find();
      return offers;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findOne(term: string): Promise<Offer> {
    try {
      const offer = await this.offerModel.findById(term);

      if (!offer) {
        throw new NotFoundException(
          `Could not find the offer "${term}". Check that the id is correct.`,
        );
      }
      return offer;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async update(term: string | Offer, updateOfferDto: UpdateOfferDto) {
    if (!Object.keys(updateOfferDto).length) {
      throw new BadRequestException(
        'Please send at least one property to modify.',
      );
    }

    let offer: Offer;

    if (typeof term === 'string') offer = await this.findOne(term);
    else offer = term;

    try {
      if (updateOfferDto.status) {
        await offer.updateOne({ status: updateOfferDto.status });
      }
      if (updateOfferDto.taker) {
        await offer.updateOne({ taker: updateOfferDto.taker });
      }
      if (typeof term === 'string') return await this.offerModel.findById(term);
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
