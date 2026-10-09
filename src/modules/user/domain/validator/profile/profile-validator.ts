import { Validator } from "@modules/app/validator/validator";
import { AuthEmailValidator } from "@modules/user/domain/validator/auth/email";
import { SignUpFirstNameValidator } from "@modules/user/domain/validator/signup/firstname";
import { SignUpLastNameValidator } from "@modules/user/domain/validator/signup/lastname";
import { SignUpUserNameValidator } from "@modules/user/domain/validator/signup/username";

interface Props {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export class ProfileValidator extends Validator {
  constructor({ userName, firstName, lastName, email }: Props) {
    super([
      new SignUpFirstNameValidator(firstName),
      new SignUpLastNameValidator(lastName),
      new SignUpUserNameValidator(userName),
      new AuthEmailValidator(email),
    ]);
  }
}
