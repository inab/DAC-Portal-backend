import validate from 'uuid-validate';
import createError from 'http-errors';
import { ValueObject } from './base';

export class UUID extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.isValidUuid(value);
  }

  private isValidUuid(id: string): void {
    if (!validate(id)) {
      throw createError(400, "The provided UUID is not valid")
    }
  }
}