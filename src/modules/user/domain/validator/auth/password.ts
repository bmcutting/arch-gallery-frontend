import type { AppException } from "../../../../app/domain/exception/app";
import type { IValidator } from "../../../../app/validator/validator";
import { EmptyPasswordException } from "../../exceptions/auth-password";

export class AuthPasswordValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyPasswordException()];
    }
    return [];
  }
}
