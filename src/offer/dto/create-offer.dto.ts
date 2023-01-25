import { IsNumber, IsIn, Min } from 'class-validator';
import { offertType, OfferType } from './../types/offerType.type';

export class CreateOfferDto {
  @IsIn(offertType)
  offerType: OfferType;

  @IsNumber()
  @Min(100)
  amount: number;

  @IsNumber()
  @Min(1)
  exchangeRate: number;

  @IsNumber()
  time: number;
}
