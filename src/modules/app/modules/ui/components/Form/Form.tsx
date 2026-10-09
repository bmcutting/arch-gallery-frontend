import { useCallback, useMemo, useState } from "react";
import type { AppException } from "@modules/app/domain/exception/app";
import { FormContext } from "./context/form-context";
import type { FormSubmit } from "./domain/form-submit";

interface Props {
  onSubmit: (submit: FormSubmit) => void;
  className?: string;
  children?: React.ReactNode;
}

export default function Form({ onSubmit, className, children }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<AppException[]>([]);

  const clearError = useCallback(
    (field: string) =>
      setErrors((prev) => prev.filter((error) => error.field !== field)),
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors([]);
    onSubmit({ setErrors });
  };

  const value = useMemo(
    () => ({ submitted, errors, clearError }),
    [submitted, errors, clearError],
  );

  return (
    <FormContext.Provider value={value}>
      <form noValidate className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
