import { IsInt, IsPositive, Min, IsString, MinLength, IsEnum, IsNumber } from 'class-validator';
export class CreateOfferDto {
    @IsString()
    offerType:string
    @IsNumber()
    @MinLength(3)
    amount:number
    @IsNumber()
    @MinLength(1)
    exchangeRate: number
    @IsNumber()
    time:number
}
