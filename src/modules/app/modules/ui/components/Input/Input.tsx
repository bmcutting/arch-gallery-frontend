import FormLoader from "@modules/app/modules/ui/shared/components/FormLoader/FormLoader";
import Clear from "@modules/app/modules/ui/shared/components/Clear/Clear";
import useFieldError from "@modules/app/modules/ui/components/Form/hooks/useFieldError";

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
  errorMsg = "Este campo es obligatorio",
  onClear = () => { inputValue.onChange("") },
  onBlur,
  onFocus,
  onKeyDown,
  className = "w-full px-3 py-2 text-sm md:text-base lg:text-lg rounded-md",
}: Props) {
  const field = useFieldError({ name, value: inputValue.value, errorMsg });
  const isInvalid = field.invalid;
  return (
    <>
      {loading ? (
        <FormLoader />
      ) : (
        <div className={`${full ? "w-full" : ""}`}>
          {/* Input + botón Clear en fila */}
          <div
            className={`relative flex items-center rounded-lg border-3 transition-colors outline-none focus-within:border-accent
              ${isInvalid ? "border-error" : "border-border"}`}
          >
            <input
              className={`${className} outline-none focus:outline-none focus:ring-0 focus:shadow-none`}
              type={type ?? "text"}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              value={inputValue.value ?? ""}
              onChange={(e) => {
                inputValue.onChange(e.target.value);
                field.onChange();
              }}
              onBlur={(e) => {
                field.onBlur();
                onBlur?.(e);
              }}
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
          {isInvalid &&
            <div className="relative mt-1 ml-1">
              <p className="absolute top-full text-sm text-error">
                {field.message}
              </p>
            </div>}
        </div>
      )}
    </>
  );
}
