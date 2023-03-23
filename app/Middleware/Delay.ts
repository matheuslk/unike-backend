import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Delay {
  public async handle(
    ctx: HttpContextContract,
    next: () => Promise<void>
  ): Promise<void> {
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(undefined);
      }, 3000);
    });
    await next();
  }
}
