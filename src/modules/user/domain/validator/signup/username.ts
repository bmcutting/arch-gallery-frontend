import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import { EmptyUserNameException } from "@modules/user/domain/exceptions/signup-username";

export class SignUpUserNameValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyUserNameException()];
    }
    return [];
  }
}
