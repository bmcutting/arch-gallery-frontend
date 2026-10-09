import { AppException } from "@modules/app/domain/exception/app";

export class EmptyPasswordException extends AppException {
  constructor() {
    super("La contraseña del usuario no puede estar vacía", "password");
  }
}
