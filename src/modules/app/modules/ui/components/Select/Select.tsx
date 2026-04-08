import clsx from "clsx";
import useSelect from "./hooks/useSelect";
import { FaChevronDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

interface Props {
  className?: string;
  label: string;
  options: Options[];
  value: string;
  error?: string;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  name?: string;
  onChange: (value: string) => void;
}

interface Options {
  value: string;
  label: string;
}

export default function Select({
  className,
  label,
  options,
  multiple = false,
  required = false,
  disabled = false,
  value,
  name,
  description,
  error,
  onChange,
}: Props) {
  const {
    getSelectedDisplay,
    isOpen,
    handleToggle,
    isSelected,
    handleOptionSelect,
  } = useSelect({ value, options, multiple, disabled, onChange });
  return (
    <div className={clsx("relative", className)}>
      {label && (
        <label
          className={clsx(
            "text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
            error ? "text-error" : "text-black",
          )}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-white 
          text-black px-3 py-2 text-sm ring-offset-background placeholder:text-foreground focus:outline-none 
          focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="truncate">{getSelectedDisplay()}</span>

          <div className="flex items-center gap-1">
            <FaChevronDown
              className={clsx(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </div>
        </button>

        <select
          name={name}
          value={value || ""}
          className="sr-only"
          onChange={() => {}}
          tabIndex={-1}
          multiple={multiple}
          required={required}
        >
          <option value="">Select...</option>
          {options?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white text-black border border-border rounded-md shadow-sm shadow-primary max-h-48 overflow-y-auto">
            {options.length === 0 ? (
              <p className="text-sm text-primary px-3 py-2">
                No hay más opciones
              </p>
            ) : (
              options.map((option) => (
                <div
                  key={option?.value}
                  className={clsx(
                    "flex cursor-pointer items-center px-3 py-2 text-sm hover:bg-primary/90",
                    isSelected(option.value) && "bg-primary text-white",
                    disabled && "pointer-events-none opacity-50",
                  )}
                  onClick={() => !disabled && handleOptionSelect(option)}
                >
                  <span className="flex-1">{option?.label}</span>
                  {multiple && isSelected(option?.value) && (
                    <FaCheck className="h-4 w-4" />
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {description && !error && (
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      )}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
