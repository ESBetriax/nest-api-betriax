import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CommonService {
    
    handleExceptions(error: any) {
        console.error(error.message);
        if (error.code === 11000) {
          throw new BadRequestException(
            `A user with that email already exists in the database ${JSON.stringify(
              error.keyValue,
            )}`,
          );
        }
        throw new InternalServerErrorException(
          `Could not authenticate. ${error.message}`,
        );
      }
}
