import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthService } from './../auth/auth.service';
import { OfferService } from './../offer/offer.service';

@Injectable()
export class AdminService {
  constructor(
    // @InjectModel(Auth.name)
    // private readonly authModel: Model<Auth>,
    private readonly authService: AuthService,
    private readonly offerService: OfferService,
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async findAll() {
    return await this.authService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
