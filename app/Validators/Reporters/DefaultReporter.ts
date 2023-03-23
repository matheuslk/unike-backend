import type {
  MessagesBagContract,
  ErrorReporterContract,
} from '@ioc:Adonis/Core/Validator';
import BadRequestException from 'App/Exceptions/BadRequestException';

export class DefaultReporter implements ErrorReporterContract {
  public hasErrors = false;
  private message: string;

  constructor(
    private readonly messages: MessagesBagContract,
    private readonly bail: boolean
  ) {
    this.bail = true;
  }

  public report(
    pointer: string,
    rule: string,
    message: string,
    arrayExpressionPointer?: string,
    args?: any
  ): void {
    this.hasErrors = true;
    const errorMessage = this.messages.get(
      pointer,
      rule,
      message,
      arrayExpressionPointer,
      args
    );

    this.message = errorMessage;

    if (this.bail) {
      throw new BadRequestException(this.message);
    }
  }

  public toError(): void {}

  public toJSON(): void {}
}
