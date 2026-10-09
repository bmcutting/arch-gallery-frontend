import { AppException } from "@modules/app/domain/exception/app";

export class EmptyEmailException extends AppException {
  constructor() {
    super("El email del usuario no puede estar vacío", "email");
  }
}

export class InvalidEmailException extends AppException {
  constructor() {
    super("El email no tiene un formato válido", "email");
  }
}
