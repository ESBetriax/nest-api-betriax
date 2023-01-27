import { IsString, IsOptional } from 'class-validator';

export class LocationDto {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  address2: string;
}
