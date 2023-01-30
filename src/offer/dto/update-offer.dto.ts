import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { CreateOfferDto } from './create-offer.dto';
import { statusList } from './../types/status.type';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @IsOptional()
  @IsIn(statusList)
  status: string;
}
