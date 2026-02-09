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
  onClear?: () => void;
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
  onClear,
  className,
}: Props) {
  return (
    <>
      {loading ? (
        <FormLoader />
      ) : (
        <div className={`relative flex items-center  ${full ? "w-full" : ""}`}>
          <input
            className={className}
            type={type ?? "text"}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value ?? ""}
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
