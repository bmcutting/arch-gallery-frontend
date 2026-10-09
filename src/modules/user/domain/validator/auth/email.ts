import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import {
  EmptyEmailException,
  InvalidEmailException,
} from "@modules/user/domain/exceptions/auth-email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AuthEmailValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyEmailException()];
    }
    if (!EMAIL_PATTERN.test(this.value.trim())) {
      return [new InvalidEmailException()];
    }
    return [];
  }
}
