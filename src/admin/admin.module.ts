import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { OfferModule } from '../offer/offer.module';

@Module({
  imports: [AuthModule, OfferModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
