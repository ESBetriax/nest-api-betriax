import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthService } from './../auth/auth.service';
import { OfferService } from './../offer/offer.service';
import { UpdateAuthDto } from '../auth/dto/update-auth.dto';
import { CommonService } from '../common/common.service';

@Injectable()
export class AdminService {
  constructor(
    // @InjectModel(Auth.name)
    // private readonly authModel: Model<Auth>,
    private readonly authService: AuthService,
    private readonly offerService: OfferService,
    private readonly commonService: CommonService
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async findAll(entity:string) {
      if(entity==="user") return await this.authService.findAll();
      if(entity==="offer") return await this.offerService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    let user = await this.authService.findOne(id)
    try {
      if(updateAuthDto.isActive){
        await user.updateOne({isActive: updateAuthDto.isActive})
      }
      return `${user} update successfully.`
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
