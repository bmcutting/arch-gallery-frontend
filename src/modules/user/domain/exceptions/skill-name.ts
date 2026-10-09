import { AppException } from "@modules/app/domain/exception/app";

export class EmptySkillNameException extends AppException {
  constructor() {
    super("El nombre de la habilidad no puede estar vacío", "name");
  }
}
