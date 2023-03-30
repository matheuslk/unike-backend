import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, type CustomMessages } from '@ioc:Adonis/Core/Validator';
import { DefaultReporter } from './Reporters/DefaultReporter';

export default class ProductFilterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = DefaultReporter;

  public schema = schema.create({
    name: schema.string.optional(),
    categories: schema.array.optional().members(schema.string()),
  });

  public messages: CustomMessages = {
    '*': (field, rule, arrayExpressionPointer, options) => {
      return 'Dados inválidos, tente novamente.';
    },
  };
}
