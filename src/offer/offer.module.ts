import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from './entities/offer.entity';

@Module({
  controllers: [OfferController],
  providers: [OfferService],
  imports: [MongooseModule.forFeature([
    {
      name: Offer.name,
      schema: OfferSchema,
    }
  ])]
})
export class OfferModule {}
