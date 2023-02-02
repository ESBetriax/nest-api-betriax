import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { OfferModule } from '../offer/offer.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [AuthModule, OfferModule, CommonModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
