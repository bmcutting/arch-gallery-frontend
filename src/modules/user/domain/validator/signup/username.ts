import type { AppException } from "../../../../app/domain/exception/app";
import type { IValidator } from "../../../../app/validator/validator";
import { EmptyUserNameException } from "../../exceptions/signup-username";

export class SignUpUserNameValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyUserNameException()];
    }
    return [];
  }
}
