import { createContext } from "react";
import type { AppException } from "@modules/app/domain/exception/app";

interface FormContextProps {
  submitted: boolean;
  errors: AppException[];
  clearError: (field: string) => void;
}

export const FormContext = createContext<FormContextProps>({
  submitted: false,
  errors: [],
  clearError: () => undefined,
});
