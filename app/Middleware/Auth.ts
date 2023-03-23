import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import type { GuardsList } from '@ioc:Adonis/Addons/Auth';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthMiddleware {
  protected redirectTo = '/login';
  protected async authenticate(
    auth: HttpContextContract['auth'],
    guards: Array<keyof GuardsList>
  ): Promise<boolean> {
    let guardLastAttempted: string | undefined;

    for (const guard of guards) {
      guardLastAttempted = guard;
      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard;
        return true;
      }
    }
    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo
    );
  }

  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: Array<keyof GuardsList>
  ): Promise<void> {
    const guards = customGuards.length > 0 ? customGuards : [auth.name];
    await this.authenticate(auth, guards);
    await next();
  }
}
