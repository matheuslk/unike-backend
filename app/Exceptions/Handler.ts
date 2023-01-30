import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import Logger from '@ioc:Adonis/Core/Logger';
import { ERROR_MESSAGES } from 'App/Utils/enums/error-messages';
import { CustomError } from 'App/Utils/models/custom-error';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(exception: any, ctx: HttpContextContract): Promise<any> {
    let status: number = 0;
    let message: string = '';
    if (exception.code === 'E_UNAUTHORIZED_ACCESS') {
      status = 401;
      message = ERROR_MESSAGES.UNAUTHORIZED_ACCESS;
    }
    if (
      exception.code === 'E_INVALID_AUTH_UID' ||
      exception.code === 'E_INVALID_AUTH_PASSWORD'
    ) {
      status = 400;
      message = ERROR_MESSAGES.INVALID_CREDENTIALS;
    }
    if (status > 0 && message.length > 0) {
      const error = new CustomError(message, exception);
      ctx.response.status(400).send(error);
      return;
    }

    console.log('ERROR CODE', exception.code);
    return await super.handle(exception, ctx);
  }
}
