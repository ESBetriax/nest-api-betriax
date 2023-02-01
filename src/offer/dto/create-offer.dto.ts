import {
  IsNumber,
  IsIn,
  Min,
  Max,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { offertType, OfferType } from './../types/offerType.type';

export class CreateOfferDto {
  @IsMongoId()
  id: string;

  @IsIn(offertType)
  offerType: OfferType;

  @IsNumber()
  @Max(9999.99)
  @Min(400)
  amount: number;

  @IsNumber()
  @Min(1)
  exchangeRate: number;

  @IsNumber()
  convertedValue: number;

  @IsNumber()
  betriaxValue: number;

  @IsNumber()
  depositValue: number;

  @IsOptional()
  @IsNumber()
  @Max(4)
  @Min(1)
  expiresAt: number;
}
