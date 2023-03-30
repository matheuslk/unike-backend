import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DefaultReporter } from './Reporters/DefaultReporter';

export default class ProductStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = DefaultReporter;

  public schema = schema.create({
    name: schema.string([rules.minLength(4), rules.maxLength(45)]),
    price: schema.number([rules.range(1, 7000)]),
    category_id: schema.number([rules.range(1, 6)]),
    description: schema.string.optional([rules.maxLength(255)]),
    files: schema.array.optional().members(
      schema.file({
        size: '1mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
    ),
    removeFiles: schema.boolean.optional(),
  });

  public messages: CustomMessages = {
    '*': (field, rule, arrayExpressionPointer, options) => {
      return 'Dados inválidos, tente novamente.';
    },
    'file.size': 'Imagens devem possuir um tamanho máximo de 1mb.',
    'file.extnames': 'Imagens devem possuir um formato entre: jpg, png e jpeg.',
  };
}
