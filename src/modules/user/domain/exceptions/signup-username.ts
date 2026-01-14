import { AppException } from "../../../app/domain/exception/app";

export class EmptyUserNameException extends AppException {
  constructor() {
    super("El nombre de usuario no puede estar vacío");
  }
}
