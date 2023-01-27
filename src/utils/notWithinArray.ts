import { BadRequestException } from '@nestjs/common';

export function notWithinArray(
  array: any[],
  value: any,
  arrayName: string,
): void {
  const foundInArray = array.find((element) => element == value);

  if (foundInArray)
    throw new BadRequestException(
      `The value ${value} is already in ${arrayName}.`,
    );
}
