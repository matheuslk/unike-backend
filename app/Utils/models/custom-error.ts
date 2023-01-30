import type { ICustomError } from '../interfaces/custom-error';

export class CustomError implements ICustomError {
  constructor(public message: string, public error: any, public code?: string) {
    this.code = code ?? '0';
  }
}
