import { IHttpError } from '../interfaces/http-error';

export class HttpError implements IHttpError {
  constructor(
    public code: string,
    public message: string,
    public error?: any
  ) {}
}
