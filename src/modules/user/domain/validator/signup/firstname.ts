import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import { EmptyFirstNameException } from "@modules/user/domain/exceptions/signup-firstname";

export class SignUpFirstNameValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyFirstNameException()];
    }
    return [];
  }
}
