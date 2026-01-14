import clsx from "clsx";
import type { Size } from "../../domain/size";

interface Props {
  size: Size;
  extra?: string;
  full: boolean;
  disabled: boolean | undefined;
}

export function inputClass({ size, extra, full, disabled }: Props): string {
  return clsx(
    "h-max",
    "bg-white",
    "rounded-input",
    "border-card border-[1.5px]",
    "transition-all duration-200",
    "outline-none",

    {
      "hover:border-primary": !disabled,
      "focus:border-primary": !disabled,
    },

    {
      "px-5 py-2": size === "lg" || size === "xl",
      "px-4 py-1.5": size === "base",
      "px-3 py-1": size === "sm",
      "px-2 py-0.5": size === "xs",
    },

    {
      "text-base": size === "base",
      "text-sm": size === "sm" || size === "xs",
      "text-lg": size === "lg",
      "text-xl": size === "xl",
    },

    {
      "w-full": full,
      "w-[120px]": !full,
    },

    extra
  );
}
