import { IsNumber, IsIn, Min, Max } from 'class-validator';
import { offertType, OfferType } from './../types/offerType.type';

export class CreateOfferDto {
  @IsIn(offertType)
  offerType: OfferType;

  @IsNumber()
  @Max(9999.99)
  @Min(400)
  amount: number;

  @IsNumber()
  @Min(1)
  exchangeRate: number;
}
