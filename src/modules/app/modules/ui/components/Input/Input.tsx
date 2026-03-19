import FormLoader from "../../shared/components/FormLoader/FormLoader";
import Clear from "../../shared/components/Clear/Clear";

interface Props {
  value: string | undefined;
  onChange(v: string): void;
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
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  placeholder,
  onChange,
  value,
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
  onKeyDown,
  className,
}: Props) {
  const isInvalid = touched && !value;
  return (
    <>
      {loading ? (
        <FormLoader />
      ) : (
        <div className={`${full ? "w-full" : ""}`}>
          {/* Input + botón Clear en fila */}
          <div
            className={`relative flex items-center ${isInvalid ? "border-red-500 border-2 rounded-lg" : "border-gray-300"}`}
          >
            <input
              className={className}
              type={type ?? "text"}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
            />
            {onClear && value && (
              <div className="absolute right-2.5 z-10">
                <Clear onClick={onClear} />
              </div>
            )}
          </div>

          {/* Mensaje de error debajo */}
          {isInvalid && <p className="mt-1 text-sm text-red-500">{errorMsg}</p>}
        </div>
      )}
    </>
  );
}
