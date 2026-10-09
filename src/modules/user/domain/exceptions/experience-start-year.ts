import { AppException } from "@modules/app/domain/exception/app";

export class InvalidExperienceStartYearException extends AppException {
  constructor() {
    super("El año de inicio no es válido", "startYear");
  }
}
