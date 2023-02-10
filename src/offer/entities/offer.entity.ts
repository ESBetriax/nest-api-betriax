import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
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

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    index: true,
    required: true,
  })
  creator: Types.ObjectId;

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

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    index: true,
  })
  taker: Types.ObjectId;

  @Prop()
  takenDate: Date;

  // company = models.ForeignKey(Company, related_name='offers', on_delete=models.CASCADE, null=True)
  // takerCompany = models.ForeignKey(Company, related_name='takers', on_delete=models.CASCADE, null=True)
  // is_active = models.BooleanField(default=True)
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
