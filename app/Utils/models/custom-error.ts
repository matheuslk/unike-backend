import type { ICustomError } from '../interfaces/custom-error';

export class CustomError implements ICustomError {
  constructor(
    public code: string,
    public message: string,
    public error?: any
  ) {}
}
