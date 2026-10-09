import { AppException } from "@modules/app/domain/exception/app";

export class EmptyExperienceInstitutionException extends AppException {
  constructor() {
    super("La institución o empresa no puede estar vacía", "institutionOrCompany");
  }
}
