import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Segmented({
  options,
  value,
  onChange,
  className,
}: Props) {
  return (
    <div
      role="tablist"
      className={clsx(
        "inline-flex items-center gap-1 p-1 rounded-input bg-muted border border-border",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(opt.value)}
            className={clsx(
              "px-3 py-1.5 text-sm rounded-input transition-smooth whitespace-nowrap",
              active
                ? "bg-card text-foreground shadow-warm-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
