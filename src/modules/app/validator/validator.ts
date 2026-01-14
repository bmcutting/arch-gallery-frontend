import type { AppException } from "../domain/exception/app";

export interface IValidator {
  validate(): AppException[];
}

interface Props {
  success(): void;
  error(errors: AppException[]): void;
}

export abstract class Validator {
  constructor(private readonly array: Array<IValidator | undefined>) {}

  execute({ error, success }: Props) {
    const errors = [] as AppException[];

    for (const v of this.array) {
      if (v) {
        const valid = v.validate();

        errors.push(...valid);
      }
    }

    if (errors.length === 0) {
      success();
    } else {
      error(errors);
    }
  }
}
