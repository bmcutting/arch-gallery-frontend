import clsx from "clsx";
import type { Size } from "../../domain/size";
import Label from "../Label/Label";
import SwitchText from "./components/SwitchText/SwitchText";

interface Props {
  label: string;
  required?: boolean;
  className?: string;
  extra?: React.ReactNode;
  size?: Size;
  enabled?: { value: boolean; onChange(v: boolean): void };
  children?: React.ReactNode;
  margin?: boolean;
}

export default function FormInput({
  children,
  label,
  required,
  className,
  extra,
  size = "sm",
  enabled,
  margin = true,
}: Props) {
  return (
    <section
      className={clsx(
        "w-full flex flex-col",
        {
          "mb-4": size !== "xs" && margin,
          "mb-3": size === "xs" && margin,
        },
        className
      )}
    >
      <div
        className={clsx("flex w-full items-center gap-x-4 justify-between", {
          "mb-1":
            (enabled === undefined ||
              (enabled !== undefined &&
                enabled.value === true &&
                children !== undefined)) &&
            label,
        })}
      >
        {enabled === undefined && (
          <Label bg={false} size={size} uppercase={false}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}

        {enabled !== undefined && (
          <SwitchText
            onChange={enabled.onChange}
            checked={enabled.value}
            text={label}
            uppercase={false}
          />
        )}

        {extra}
      </div>
      {children}
    </section>
  );
}
