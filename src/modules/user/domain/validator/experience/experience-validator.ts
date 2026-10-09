import { Validator } from "@modules/app/validator/validator";
import { ExperienceTitleValidator } from "./title";
import { ExperienceInstitutionValidator } from "./institution";
import { ExperienceStartYearValidator } from "./start-year";

interface Props {
  title: string;
  institutionOrCompany: string;
  startYear: number;
}

export class ExperienceValidator extends Validator {
  constructor({ title, institutionOrCompany, startYear }: Props) {
    super([
      new ExperienceTitleValidator(title),
      new ExperienceInstitutionValidator(institutionOrCompany),
      new ExperienceStartYearValidator(startYear),
    ]);
  }
}
