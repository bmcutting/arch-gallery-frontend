import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import { EmptyExperienceTitleException } from "@modules/user/domain/exceptions/experience-title";

export class ExperienceTitleValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyExperienceTitleException()];
    }
    return [];
  }
}
