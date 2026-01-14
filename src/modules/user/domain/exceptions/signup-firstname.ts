import { AppException } from "../../../app/domain/exception/app";

export class EmptyFirstNameException extends AppException {
  constructor() {
    super("El nombre del usuario no puede estar vacío");
  }
}
