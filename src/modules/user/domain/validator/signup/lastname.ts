import type { AppException } from "../../../../app/domain/exception/app";
import type { IValidator } from "../../../../app/validator/validator";
import { EmptyLastNameException } from "../../exceptions/signup-lastname";

export class SignUpLastNameValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyLastNameException()];
    }
    return [];
  }
}
