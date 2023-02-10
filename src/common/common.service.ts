import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  handleExceptions(error: any, entity?: string): never {
    if (error.name === 'BadRequestException')
      throw new BadRequestException(error.message);
    if (error.name === 'InternalServerErrorException')
      throw new InternalServerErrorException(error.message);

    console.error(error.message);

    if (error.code === 11000) {
      throw new BadRequestException({
        message: `${entity || 'An entity'} with that ${
          Object.keys(error.keyPattern)[0]
        } already exists in the database ${JSON.stringify(error.keyValue)}`,
      });
    }

    throw new InternalServerErrorException(
      `Something went wrong. ${error.message}`,
    );
  }
}
