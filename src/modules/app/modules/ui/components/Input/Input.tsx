import { useMemo } from "react";
import type { Size } from "../../domain/size";
import { inputClass } from "../../shared/domain/input-class";
import FormLoader from "../../shared/components/FormLoader/FormLoader";
import Clear from "../../shared/components/Clear/Clear";

interface Props {
  value: string | undefined;
  onChange(v: string): void;
  size: Size;
  placeholder?: string;
  name?: string;
  type?: "text" | "password";
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClear?: () => void;
}

export default function Input({
  placeholder,
  onChange,
  size,
  value,
  type,
  name,
  full = true,
  loading = false,
  disabled,
  onClear,
}: Props) {
  const CLASS = useMemo(
    () => inputClass({ size: size, full: full, disabled: disabled }),
    [size, full, disabled]
  );

  return (
    <>
      {loading ? (
        <FormLoader />
      ) : (
        <div className="relative w-full flex items-center">
          <input
            className={CLASS}
            type={type ? type : "text"}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value !== undefined ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />

          {onClear && value && (
            <div className="absolute right-2.5 z-10">
              <Clear onClick={onClear} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
