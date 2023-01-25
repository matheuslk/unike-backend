import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async login({ auth, request }: HttpContextContract) {
    const { email, password } = request.body();
    return await auth.use('jwt').attempt(email, password);
  }

  public async refresh({ auth, request }: HttpContextContract) {
    const { refreshToken } = request.body();
    return await auth.use('jwt').loginViaRefreshToken(refreshToken);
  }
}
