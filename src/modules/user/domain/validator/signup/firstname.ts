import type { AppException } from "../../../../app/domain/exception/app";
import type { IValidator } from "../../../../app/validator/validator";
import { EmptyFirstNameException } from "../../exceptions/signup-firstname";

export class SignUpFirstNameValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyFirstNameException()];
    }
    return [];
  }
}
