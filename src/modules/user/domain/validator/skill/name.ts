import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import { EmptySkillNameException } from "@modules/user/domain/exceptions/skill-name";

export class SkillNameValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptySkillNameException()];
    }
    return [];
  }
}
