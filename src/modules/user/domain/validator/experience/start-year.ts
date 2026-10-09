import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import { InvalidExperienceStartYearException } from "@modules/user/domain/exceptions/experience-start-year";

export class ExperienceStartYearValidator implements IValidator {
  constructor(private readonly value: number) {}

  validate(): AppException[] {
    if (!Number.isInteger(this.value)) {
      return [new InvalidExperienceStartYearException()];
    }
    return [];
  }
}
