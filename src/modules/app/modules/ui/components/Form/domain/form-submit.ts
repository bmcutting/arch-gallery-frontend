import type { AppException } from "@modules/app/domain/exception/app";

export interface FormSubmit {
  setErrors: (errors: AppException[]) => void;
}
