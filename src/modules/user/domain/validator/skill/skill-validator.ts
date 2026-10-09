import { Validator } from "@modules/app/validator/validator";
import { SkillNameValidator } from "./name";

interface Props {
  name: string;
}

export class SkillValidator extends Validator {
  constructor({ name }: Props) {
    super([new SkillNameValidator(name)]);
  }
}
