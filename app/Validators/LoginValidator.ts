import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DefaultReporter } from './Reporters/DefaultReporter';

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = DefaultReporter;

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(4)]),
  });

  public messages: CustomMessages = {
    '*': (field, rule, arrayExpressionPointer, options) => {
      return 'Dados inválidos, tente novamente.';
    },
  };
}
