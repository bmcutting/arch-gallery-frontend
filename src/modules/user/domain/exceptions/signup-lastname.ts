import { AppException } from "../../../app/domain/exception/app";

export class EmptyLastNameException extends AppException {
  constructor() {
    super("El apellido del usuario no puede estar vacío");
  }
}
