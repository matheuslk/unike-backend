import {
  ValidationException,
  type MessagesBagContract,
  type ErrorReporterContract,
} from '@ioc:Adonis/Core/Validator';
import { CustomError } from 'App/Utils/models/custom-error';

export class DefaultReporter
  implements ErrorReporterContract<{ message: string }>
{
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
      this.toError();
    }
  }

  public toError(): void {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new ValidationException(false, this.toJSON());
  }

  public toJSON(): CustomError {
    return new CustomError('0', this.message);
  }
}
