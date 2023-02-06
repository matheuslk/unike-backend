import { Exception } from '@adonisjs/core/build/standalone';
import type { JWTTokenContract } from '@ioc:Adonis/Addons/Jwt';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import type User from 'App/Models/User';

export default class AuthController {
  public async login({
    auth,
    request,
  }: HttpContextContract): Promise<JWTTokenContract<User>> {
    const { email, password } = request.body();
    return await auth.attempt(email, password);
  }

  public async refresh({
    auth,
    request,
  }: HttpContextContract): Promise<JWTTokenContract<User>> {
    try {
      const refreshToken = request.headers().refresh_token as string;
      return await auth.use('jwt').loginViaRefreshToken(refreshToken);
    } catch (error) {
      throw new Exception('', 500, 'E_INVALID_REFRESH_TOKEN');
    }
  }

  public async check({ response }: HttpContextContract): Promise<void> {
    response.status(200).send({});
  }
}
