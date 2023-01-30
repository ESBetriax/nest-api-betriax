import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import mongoose, { Document } from 'mongoose';
import { Offer } from 'src/offer/entities/offer.entity';
import { LocationDto } from '../dto/location.dto';
import { Role, roleList } from './../types/role.type';

@Schema()
export class Auth extends Document {
  @Prop({
    maxlength: 128,
  })
  name: string;

  @Prop({
    maxlength: 128,
  })
  lastName: string;

  @Prop({
    maxlength: 32,
  })
  phone: string;

  @Prop({
    unique: true,
    required: true,
    index: true,
    maxlength: 32,
  })
  email: string;

  @Prop({
    maxlength: 32,
  })
  identification: string;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: String,
  })
  identificationFile: string;

  // token = models.CharField(max_length=8, null=True, default=None)
  // transaction_token = models.CharField(max_length=8, null=True, default=None)
  // is_active = models.BooleanField(default=True)
  @Prop({
    default: false,
  })
  isActive?: boolean;

  @Prop({
    default: roleList[0],
  })
  role: Role;

  @Prop({
    required: true,
  })
  location: LocationDto;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offersTaken' }],
    index: true,
  })
  offersTaken: [Offer];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offersCreated' }],
    index: true,
  })
  offersCreated: [Offer];

  @Prop()
  timestamps: true;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
