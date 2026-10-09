import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import {
  EmptyConfirmPasswordException,
  PasswordMismatchException,
} from "@modules/user/domain/exceptions/signup-confirm-password";

export class SignUpConfirmPasswordValidator implements IValidator {
  constructor(
    private readonly password: string,
    private readonly confirmPassword: string,
  ) {}

  validate(): AppException[] {
    if (this.confirmPassword.trim().length === 0) {
      return [new EmptyConfirmPasswordException()];
    }
    if (this.password !== this.confirmPassword) {
      return [new PasswordMismatchException()];
    }
    return [];
  }
}
