import { Validator } from "@modules/app/validator/validator";
import { AuthPasswordValidator } from "@modules/user/domain/validator/auth/password";
import { SignUpConfirmPasswordValidator } from "./confirm-password";

interface Props {
  password: string;
  confirmPassword: string;
}

export class SignUpPasswordValidator extends Validator {
  constructor({ password, confirmPassword }: Props) {
    super([
      new AuthPasswordValidator(password),
      new SignUpConfirmPasswordValidator(password, confirmPassword),
    ]);
  }
}
