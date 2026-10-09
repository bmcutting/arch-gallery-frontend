import { useContext, useState } from "react";
import { FormContext } from "../context/form-context";
import { FieldContext } from "../context/field-context";

interface Props {
  name?: string;
  value: string | undefined;
  errorMsg: string;
}

export default function useFieldError({ name, value, errorMsg }: Props) {
  const { submitted, errors, clearError } = useContext(FormContext);
  const { required } = useContext(FieldContext);
  const [blurred, setBlurred] = useState(false);

  const empty = required && !value && (blurred || submitted);
  const fieldError = name
    ? errors.find((error) => error.field === name)
    : undefined;
  const message = empty ? errorMsg : fieldError?.message;

  return {
    invalid: message !== undefined,
    message,
    onBlur: () => setBlurred(true),
    onChange: () => {
      if (name && fieldError) clearError(name);
    },
  };
}
