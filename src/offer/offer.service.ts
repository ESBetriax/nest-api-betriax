import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    try {
      const expiresAt = moment()
        .add(createOfferDto.expiresAt || 1, 'h')
        .toDate();

      const offer = await this.offerModel.create({
        ...createOfferDto,
        expiresAt,
      });

      return offer;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException(`Could not create offer.`);
    }
  }

  async findAll() {
    const offers = await this.offerModel.find();
    return offers;
  }

  async findOne(term: string) {
    const offer = await this.offerModel.findById(term);

    if (!offer) {
      throw new NotFoundException(
        `Could not find the offer "${term}". Check that either the id is correct.`,
      );
    }
    return offer;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
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
