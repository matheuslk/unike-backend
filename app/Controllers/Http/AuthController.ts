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
    const refreshToken = request.headers().refresh_token as string;
    return await auth.use('jwt').loginViaRefreshToken(refreshToken);
  }

  public async check({ response }: HttpContextContract): Promise<void> {
    response.send(200);
  }
}
