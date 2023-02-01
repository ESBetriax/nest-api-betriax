import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { Offer, OfferSchema } from './entities/offer.entity';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService],
})
export class OfferModule {}
