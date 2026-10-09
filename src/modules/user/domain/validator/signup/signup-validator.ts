import { Validator } from "@modules/app/validator/validator";
import { AuthEmailValidator } from "@modules/user/domain/validator/auth/email";
import { SignUpFirstNameValidator } from "./firstname";
import { SignUpLastNameValidator } from "./lastname";
import { SignUpUserNameValidator } from "./username";

interface Props {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export class SignUpValidator extends Validator {
  constructor({ userName, firstName, lastName, email }: Props) {
    super([
      new AuthEmailValidator(email),
      new SignUpUserNameValidator(userName),
      new SignUpLastNameValidator(lastName),
      new SignUpFirstNameValidator(firstName),
    ]);
  }
}
