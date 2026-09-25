import FormLoader from "../../shared/components/FormLoader/FormLoader";
import Clear from "../../shared/components/Clear/Clear";

export interface InputValue {
  value: string | undefined;
  onChange(v: string): void;
}

interface Props {
  inputValue: InputValue;
  placeholder?: string;
  name?: string;
  type?: "text" | "password";
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  touched?: boolean;
  required?: boolean;
  errorMsg?: string;
  onClear?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  placeholder,
  inputValue,
  type,
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
  onKeyDown,
  className,
}: Props) {
  const isInvalid = touched && !inputValue.value;
  return (
    <>
      {loading ? (
        <FormLoader />
      ) : (
        <div className={`${full ? "w-full" : ""}`}>
          {/* Input + botón Clear en fila */}
          <div
            className={`relative flex items-center ${isInvalid ? "border-error border-2 rounded-lg" : "border-border"}`}
          >
            <input
              className={className}
              type={type ?? "text"}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              value={inputValue.value ?? ""}
              onChange={(e) => inputValue.onChange(e.target.value)}
              onBlur={onBlur}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
            />
            {onClear && inputValue.value && (
              <div className="absolute right-2.5 z-10">
                <Clear onClick={onClear} />
              </div>
            )}
          </div>

          {/* Mensaje de error debajo */}
          {isInvalid && <p className="mt-1 text-sm text-error">{errorMsg}</p>}
        </div>
      )}
    </>
  );
}
