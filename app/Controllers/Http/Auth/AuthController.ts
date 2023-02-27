import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BadRequestException from 'App/Exceptions/BadRequestException';
import { ERROR_MESSAGES } from 'App/Utils/enums/error-messages';
import LoginValidator from 'App/Validators/LoginValidator';

export default class AuthController {
  public async login({ auth, request }: HttpContextContract) {
    try {
      await request.validate(LoginValidator);
      const body = request.body();
      return await auth.attempt(body.email, body.password);
    } catch (error) {
      throw new BadRequestException(ERROR_MESSAGES.BAD_REQUEST);
    }
  }

  public async refresh({ auth, request }: HttpContextContract) {
    try {
      const refresh_token = request.header('refresh_token');
      return await auth.use('jwt').loginViaRefreshToken(refresh_token ?? '');
    } catch (error) {
      throw new Exception('', undefined, 'E_INVALID_REFRESH_TOKEN');
    }
  }

  public async check() {}
}
