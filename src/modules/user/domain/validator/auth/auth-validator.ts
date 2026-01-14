import { Validator } from "../../../../app/validator/validator";
import { AuthEmailValidator } from "./email";
import { AuthPasswordValidator } from "./password";

interface Props {
  email: string;
  password: string;
}

export class AuthValidator extends Validator {
  constructor({ email, password }: Props) {
    super([
      new AuthEmailValidator(email),
      new AuthPasswordValidator(password),
    ]);
  }
}
