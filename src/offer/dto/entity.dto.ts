import { IsString, Matches } from 'class-validator';
import { PaginationDto } from './../../common/dto/pagination.dto';

export class EntityDto extends PaginationDto{
    @IsString()
    @Matches(/^(user|offer)$/)
    entity:string
}