import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Application from '@ioc:Adonis/Core/Application';

export default class ProductsController {
  public async upload({
    auth,
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const file = request.file('file');
    if (file === null) {
      response.status(400).send({
        message: 'file not found',
      });
      return;
    }
    await file?.move(Application.makePath('../uploads'));
    response.status(200).send({
      message: 'file moved',
    });
  }
}
