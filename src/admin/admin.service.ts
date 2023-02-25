import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';

import { UserService } from 'src/user/user.service';

import { CommonService } from '../common/common.service';
import { OfferService } from './../offer/offer.service';
import { UpdateUserDto } from './../user/dto/update-user.dto';
import { PaginationDto } from './../common/dto/pagination.dto';
import { EntityDto } from './../offer/dto/entity.dto';


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

  async findAll(paginationDto: EntityDto) {
    const{entity} = paginationDto;
    //poner swith para que emi duerma traquilo.
    if(entity=='user') {
        return await this.userService.findAll(paginationDto)
    } else{
        return await this.offerService.findAll(paginationDto);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    if (!Object.keys(updateUserDto).length)
      throw new BadRequestException(
        'Please send at least one property to modify.',
      );

    const user = await this.userService.findOne(id);
    try {
      if (updateUserDto.isActive) {
        if (user.isActive === updateUserDto.isActive)
          throw new BadRequestException(
            `The property isActive is already ${user.isActive}.`,
          );

        await user.updateOne({ isActive: updateUserDto.isActive });
      }

      return `User ${user.name} ${user.lastName} updated successfully.`;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
