import type { AppException } from "@modules/app/domain/exception/app";
import type { IValidator } from "@modules/app/validator/validator";
import { EmptyExperienceInstitutionException } from "@modules/user/domain/exceptions/experience-institution";

export class ExperienceInstitutionValidator implements IValidator {
  constructor(private readonly value: string) {}

  validate(): AppException[] {
    if (this.value.trim().length === 0) {
      return [new EmptyExperienceInstitutionException()];
    }
    return [];
  }
}
