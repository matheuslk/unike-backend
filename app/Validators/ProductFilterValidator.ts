import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ProductFilterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    category_id: schema.number.optional([rules.range(1, 6)]),
    size: schema.string.optional(),
  });

  public messages: CustomMessages = {
    '*': (field, rule, arrayExpressionPointer, options) => {
      return 'Dados inválidos, tente novamente.';
    },
  };
}
