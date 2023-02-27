import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import Logger from '@ioc:Adonis/Core/Logger';
import { ERROR_MESSAGES } from 'App/Utils/enums/error-messages';
import { HttpError } from 'App/Utils/models/http-error';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract) {
    const exception_codes = [
      'E_UNAUTHORIZED_ACCESS',
      'E_INVALID_REFRESH_TOKEN',
    ];

    if (exception_codes.includes(error.code)) {
      return ctx.response
        .status(401)
        .send(new HttpError('0', ERROR_MESSAGES.UNAUTHORIZED));
    }

    return super.handle(error, ctx);
  }
}
