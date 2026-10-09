import { AppException } from "@modules/app/domain/exception/app";

export class EmptyExperienceTitleException extends AppException {
  constructor() {
    super("El título no puede estar vacío", "title");
  }
}
