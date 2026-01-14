import type { AppException } from "../../../../app/domain/exception/app";
import type { IValidator } from "../../../../app/validator/validator";
import { EmptyEmailException } from "../../exceptions/auth-email";

export class AuthEmailValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyEmailException()];
    }
    return [];
  }
}
