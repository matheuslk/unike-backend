import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BadRequestException from 'App/Exceptions/BadRequestException';
import Product from 'App/Models/Product';
import { ERROR_MESSAGES } from 'App/Utils/enums/error-messages';

export default class FindProduct {
  public async handle(
    ctx: HttpContextContract,
    next: () => Promise<void>
  ): Promise<void> {
    const { id } = ctx.params;
    try {
      const product = await Product.findOrFail(id);
      ctx.product = product;
    } catch (error) {
      throw new BadRequestException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }
    await next();
  }
}
