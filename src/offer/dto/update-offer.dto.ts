import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsIn, IsMongoId, IsOptional } from 'class-validator';
import { CreateOfferDto } from './create-offer.dto';
import { statusList } from './../types/status.type';

export class UpdateOfferDto extends PartialType(
  OmitType(CreateOfferDto, ['id'] as const),
) {
  @IsOptional()
  @IsIn(statusList)
  status: string;

  @IsOptional()
  @IsMongoId()
  taker?: string;
}
