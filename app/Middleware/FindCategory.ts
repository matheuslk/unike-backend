import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BadRequestException from 'App/Exceptions/BadRequestException';
import Category from 'App/Models/Category';
import { ERROR_MESSAGES } from 'App/Utils/enums/error-messages';

export default class FindCategory {
  public async handle(
    { request }: HttpContextContract,
    next: () => Promise<void>
  ): Promise<void> {
    const { category_id } = request.body();
    try {
      await Category.findOrFail(category_id);
    } catch (error) {
      throw new BadRequestException(ERROR_MESSAGES.BAD_REQUEST);
    }
    await next();
  }
}
