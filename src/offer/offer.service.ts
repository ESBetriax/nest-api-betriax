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
import { UserService } from 'src/user/user.service';
import { CommonService } from 'src/common/common.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly commonService: CommonService,
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
      console.error(error.message);
      throw new InternalServerErrorException(`Could not create offer.`);
    }
  }

  async findAll(paginationDto:PaginationDto) {
    try {
      const { limit=10, offset=0 } = paginationDto;
      if(offset>0){
        return await this.offerModel.find().limit(limit).skip((offset-1)*10).sort({no:1});
      }
      return await this.offerModel.find().limit(limit).skip(offset).sort({no:1});
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findOne(term: string): Promise<Offer> {
    const offer = await this.offerModel.findById(term);

    if (!offer) {
      throw new NotFoundException(
        `Could not find the offer "${term}". Check that either the id is correct.`,
      );
    }
    return offer;
  }

  async update(term: string | Offer, updateOfferDto: UpdateOfferDto) {
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
    } catch (error) {
      this.handleExceptions(error);
    }
    if (typeof term === 'string') return await this.offerModel.findById(term);
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }

  handleExceptions(error: any) {
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
