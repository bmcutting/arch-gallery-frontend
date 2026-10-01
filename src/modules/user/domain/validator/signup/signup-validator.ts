import { Validator } from "@modules/app/validator/validator";
import { AuthEmailValidator } from "@modules/user/domain/validator/auth/email";
import { AuthPasswordValidator } from "@modules/user/domain/validator/auth/password";
import { SignUpFirstNameValidator } from "./firstname";
import { SignUpLastNameValidator } from "./lastname";
import { SignUpUserNameValidator } from "./username";

interface Props {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export class SignUpValidator extends Validator {
  constructor({ userName, firstName, lastName, email, password }: Props) {
    super([
      new AuthEmailValidator(email),
      new AuthPasswordValidator(password),
      new SignUpUserNameValidator(userName),
      new SignUpLastNameValidator(lastName),
      new SignUpFirstNameValidator(firstName),
    ]);
  }
}
