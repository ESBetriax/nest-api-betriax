import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/auth/entities/auth.entity';
import { AuthModule } from '../auth/auth.module';
import { OfferModule } from '../offer/offer.module';

@Module({
  imports: [
    AuthModule,
    OfferModule
    // forwardRef(() => AuthModule),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
