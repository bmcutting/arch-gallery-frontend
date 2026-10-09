import { AppException } from "@modules/app/domain/exception/app";

export class EmptyConfirmPasswordException extends AppException {
  constructor() {
    super("Debe confirmar la contraseña", "confirmPassword");
  }
}

export class PasswordMismatchException extends AppException {
  constructor() {
    super("Las contraseñas no coinciden", "confirmPassword");
  }
}
