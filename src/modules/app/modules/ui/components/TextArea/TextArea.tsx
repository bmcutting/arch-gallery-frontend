import Clear from "@modules/app/modules/ui/shared/components/Clear/Clear";
import FormLoader from "@modules/app/modules/ui/shared/components/FormLoader/FormLoader";
import type { InputValue } from "@modules/app/modules/ui/components/Input/Input";

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
  className = "h-40 md:h-56 lg:h-64 px-3 py-2 text-sm md:text-base lg:text-lg resize-none leading-relaxed",
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
            className={`relative rounded-md border-2 transition-colors outline-none focus-within:border-accent
              ${isInvalid ? "border-error" : "border-border"}`}
          >
            <textarea
              className={`w-full border-0 outline-none focus:outline-none focus:ring-0 focus:shadow-none ${className}`}
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
