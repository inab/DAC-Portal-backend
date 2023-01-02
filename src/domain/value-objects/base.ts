import createError from 'http-errors';

export type Primitives = String | string | number | Boolean | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.isDefined(value);
  }

  private isDefined(value: T): void {
    if (value === null || value === undefined) {
      throw createError(400, 'Value must be defined');
    }
  }
}