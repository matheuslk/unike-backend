import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { HttpError } from 'App/Utils/models/http-error';

export default class BadRequestException extends Exception {
  public async handle(error: this, ctx: HttpContextContract): Promise<void> {
    ctx.response
      .status(400)
      .send(new HttpError(error.code ?? '0', error.message));
  }
}
