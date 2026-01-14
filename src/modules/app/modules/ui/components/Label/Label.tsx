import clsx from "clsx";
import type { Size } from "../../domain/size";

interface Props {
  children: React.ReactNode;
  size: Size;
  uppercase?: boolean;
  bg?: boolean;
}

export default function Label({ children, size, uppercase, bg }: Props) {
  return (
    <label
      htmlFor=""
      className={clsx(
        "text-gray-600 font-medium",
        {
          "text-sm": size === "sm",
          "text-base": size === "base",
          "text-xs": size === "xs",
        },

        { uppercase: uppercase },

        {
          "py-1 px-2 rounded-md bg-primary/20 text-secondary": bg,
        }
      )}
    >
      {children}
    </label>
  );
}
