import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import { EmptyEmailException } from "@modules/user/domain/exceptions/auth-email";

export class AuthEmailValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyEmailException()];
    }
    return [];
  }
}
