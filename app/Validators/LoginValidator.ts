import { schema, type CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DefaultReporter } from './Reporters/DefaultReporter';

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = DefaultReporter;

  public schema = schema.create({
    email: schema.string({}, [rules.required(), rules.email()]),
    password: schema.string({}, [rules.required(), rules.minLength(4)]),
  });

  public messages: CustomMessages = {
    required: 'Preencha todos os campos.',
    'email.email': 'Email inválido.',
    'password.minLength': 'Senha deve possuir no mínimo 4 caracteres.',
  };
}
