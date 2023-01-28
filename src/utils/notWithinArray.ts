import { BadRequestException } from '@nestjs/common';

export function notWithinArray<T>(
  array: T[],
  value: T,
  arrayName: string,
): void {
  const foundInArray = array.find((element) => element == value);

  if (foundInArray)
    throw new BadRequestException(
      `The value ${value} is already in ${arrayName}.`,
    );
}
