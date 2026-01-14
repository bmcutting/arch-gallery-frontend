import { AppException } from "../../../app/domain/exception/app";

export class EmptyEmailException extends AppException {
  constructor() {
    super("El email del usuario no puede estar vacío");
  }
}
