import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  handleExceptions(error: any, entity?: string) {
    console.error(error.message);
    console.log(error);
    console.log(Object.keys(error.keyPattern));
    if (error.code === 11000)
      throw new BadRequestException(
        `${entity || 'An entity'} with that ${
          Object.keys(error.keyPattern)[0]
        } already exists in the database ${JSON.stringify(error.keyValue)}`,
      );
    if (typeof error !== 'string')
      throw new InternalServerErrorException(
        `Could not authenticate. ${error.message}`,
      );
  }
}
