import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { notWithinArray } from 'src/utils/notWithinArray';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto, UpdateAuthDto } from './dto';
import { CommonService } from '../common/common.service';
import { OfferService } from './../offer/offer.service';
import { statusList } from './../offer/types/status.type';
import { UpdateOfferDto } from './../offer/dto/update-offer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly offerService: OfferService,
    private readonly commonService: CommonService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    try {
      const { password, ...userData } = createAuthDto;

      let user: Auth = await this.authModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 12),
      });

      user = user.toObject();
      delete user.password;

      return user;
    } catch (error) {
      this.commonService.handleExceptions(error, 'A user');
    }
  }

  async login() {
    return 'Logged successfully';
  }

  async findAll() {
    try {
      return await this.authModel.find();
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
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

  async update(term: string, updateAuthDto: UpdateAuthDto): Promise<Auth> {
    let user = await this.findOne(term);

    try {
      if (updateAuthDto.offersTaken) {
        const newOffer = await this.offerService.findOne(
          updateAuthDto.offersTaken,
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

        user = await this.authModel.findByIdAndUpdate(
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
    return `This action removes a #${id} auth`;
  }
}
