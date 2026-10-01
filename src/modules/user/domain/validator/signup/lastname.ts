import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import { EmptyLastNameException } from "@modules/user/domain/exceptions/signup-lastname";

export class SignUpLastNameValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyLastNameException()];
    }
    return [];
  }
}
