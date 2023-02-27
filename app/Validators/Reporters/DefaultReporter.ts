import {
  MessagesBagContract,
  ErrorReporterContract,
} from '@ioc:Adonis/Core/Validator';
import BadRequestException from 'App/Exceptions/BadRequestException';

export class DefaultReporter implements ErrorReporterContract {
  public hasErrors = false;
  private message: string;

  constructor(private messages: MessagesBagContract, private bail: boolean) {
    this.bail = true;
  }

  public report(
    pointer: string,
    rule: string,
    message: string,
    arrayExpressionPointer?: string,
    args?: any
  ) {
    this.hasErrors = true;
    console.log('DEFAULT REPORTER ERROR POINTER,RULE', pointer, rule);
    const errorMessage = this.messages.get(
      pointer,
      rule,
      message,
      arrayExpressionPointer,
      args
    );

    this.message = errorMessage;

    if (this.bail) {
      throw this.toError();
    }
  }

  public toError(): void {
    throw new BadRequestException(this.message);
  }

  public toJSON(): void {}
}
