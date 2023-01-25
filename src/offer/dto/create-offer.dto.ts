import { MinLength, IsNumber, IsIn } from 'class-validator';
import { offertType, OfferType } from './../types/offerType.type';

export class CreateOfferDto {
  @IsIn(offertType)
  offerType: OfferType;

  @IsNumber()
  @MinLength(3)
  amount: number;

  @IsNumber()
  @MinLength(1)
  exchangeRate: number;

  @IsNumber()
  time: number;
}
