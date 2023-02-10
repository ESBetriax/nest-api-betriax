import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

import { UserService } from 'src/user/user.service';

import { CommonService } from '../common/common.service';
import { OfferService } from './../offer/offer.service';
import { UpdateUserDto } from './../user/dto/update-user.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly offerService: OfferService,
    private readonly commonService: CommonService,
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async findAll(entity: string) {
    switch (entity) {
      case 'user':
        return await this.userService.findAll();
      case 'offer':
        return await this.offerService.findAll();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOne(id);
    try {
      if (updateUserDto.isActive) {
        await user.updateOne({ isActive: updateUserDto.isActive });
      }
      return `${user} update successfully.`;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
