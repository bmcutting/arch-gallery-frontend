import Clear from "../../shared/components/Clear/Clear";
import FormLoader from "../../shared/components/FormLoader/FormLoader";
import type { InputValue } from "../Input/Input";

interface Props {
  inputValue: InputValue;
  placeholder?: string;
  name?: string;
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  touched?: boolean;
  required?: boolean;
  errorMsg?: string;
  onClear?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
  maxChars?: number;
}

export default function Textarea({
  placeholder,
  inputValue,
  name,
  full = true,
  loading = false,
  disabled,
  touched,
  errorMsg,
  required,
  onClear,
  onBlur,
  onFocus,
  className,
  maxChars,
}: Props) {
  const isInvalid = touched && !inputValue.value;
  const length = inputValue.value?.length ?? 0;

  return (
    <>
      {loading ? (
        <FormLoader />
      ) : (
        <div className={`${full ? "w-full" : ""}`}>
          <div
            className={`relative ${isInvalid ? "border-error border-2 rounded-lg" : "border-border"}`}
          >
            <textarea
              className={`w-full resize-none ${className}`}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              value={inputValue.value ?? ""}
              onChange={(e) => inputValue.onChange(e.target.value)}
              onBlur={onBlur}
              onFocus={onFocus}
              rows={4}
            />
            {onClear && inputValue.value && (
              <div className="absolute right-2.5 top-2 z-10">
                <Clear onClick={onClear} />
              </div>
            )}
          </div>

          {isInvalid && <p className="mt-1 text-sm text-error">{errorMsg}</p>}

          {maxChars && (
            <p
              className={`text-xs mt-2 ${length >= maxChars
                ? "text-error font-extrabold"
                : "text-muted-foreground"
                }`}
            >
              {length}/{maxChars} caracteres
            </p>
          )}
        </div>
      )}
    </>
  );
}
