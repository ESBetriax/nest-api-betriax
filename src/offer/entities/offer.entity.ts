import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
import { OfferType } from '../types/offerType.type';
import { status } from '../types/status.type';
import { statusList } from './../types/status.type';

@Schema()
export class Offer extends Document {
  @Prop({
    required: true,
  })
  offerType: OfferType;

  @Prop({
    max: 9999.99,
    min: 400,
  })
  amount: number;

  @Prop()
  exchangeRate: number;

  @Prop({ default: statusList[0] })
  status: status;

  @Prop()
  convertedValue: number;

  @Prop()
  betriaxValue: number;

  @Prop()
  depositValue: number;

  @Prop()
  date: Date;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop()
  expiresAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;

  // end_date = models.DateTimeField(null=True)
  // created_date = models.DateTimeField(auto_now_add=True)
  // company = models.ForeignKey(Company, related_name='offers', on_delete=models.CASCADE, null=True)
  // person = models.ForeignKey(Person, related_name='offers', on_delete=models.CASCADE, null=True)
  // taker = models.ForeignKey(Company, related_name='takers', on_delete=models.CASCADE, null=True)
  // taker_person = models.ForeignKey(Person, related_name='takers', on_delete=models.CASCADE, null=True)
  // taken_date = models.DateTimeField(null=True)
  // is_active = models.BooleanField(default=True)
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
