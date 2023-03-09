import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from './../user/user.module';
import { OfferModule } from '../offer/offer.module';
import { CommonModule } from '../common/common.module';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [UserModule, OfferModule, CommonModule, AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
