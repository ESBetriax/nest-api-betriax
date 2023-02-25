import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { Offer, OfferSchema } from './entities/offer.entity';
import { CommonModule } from './../common/common.module';
import { UserModule } from './../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema,
      },
    ]),
    CommonModule,
    forwardRef(() => UserModule),
  ],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService],
})
export class OfferModule {}
