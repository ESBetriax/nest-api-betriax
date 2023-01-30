import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
        .local()
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

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
