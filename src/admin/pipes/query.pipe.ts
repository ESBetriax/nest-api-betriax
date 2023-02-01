import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidQuery } from '../types/query.type';

@Injectable()
export class QueryPipe implements PipeTransform {
  transform(value: string) {
    if (!isValidQuery(value)) {
      throw new BadRequestException(`${value} is not a valid query.`);
    }
    return value;
  }
}
