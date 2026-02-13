/* eslint-disable react-refresh/only-export-components */
import React, { forwardRef } from "react";
import type { IconProps } from "../../../../../icon/domain/props";
import type { Size } from "../../domain/size";
import clsx from "clsx";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  full?: boolean;
  color?: "primary" | "light" | "danger";
  size: Size;
  className?: string;
  icon?: (props: IconProps) => React.ReactElement;
  uppercase?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  status?: "idle" | "success" | "error";
}

export default forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      onClick,
      type = "button",
      full,
      color = "primary",
      size,
      className,
      icon,
      uppercase,
      rounded,
      loading,
      disabled,
      status,
    }: Props,
    ref,
  ) => {
    const CLASS = clsx(
      "flex items-center justify-center",
      "transition-all duration-300",
      "whitespace-nowrap",

      uppercase && "uppercase",

      {
        "bg-green-300 text-white": status === "success",
        "border-2 border-red-300 text-red-300 bg-white": status === "error",
        "bg-primary text-white hover:bg-primary/90":
          status === "idle" || !status,
      },

      {
        "bg-primary": color === "primary" && !loading,
        "bg-white": color === "light" && !loading,
        "bg-red-400": color === "danger" && !loading,
      },

      { "bg-secondary": color === "primary" && loading },

      {
        "text-white": color === "primary" || color === "danger",
        "text-black": color === "light",
      },

      { "border-card border-[1.5px]": color === "light" },

      { "w-max": !full, "w-full": full },

      {
        "text-sm": size === "base",
        "text-lg": size === "xl",
        "text-base": size === "lg",
        "text-xs": size === "sm" || size === "xs",
      },

      {
        "rounded-input": !rounded,
        "rounded-full": rounded,
      },

      {
        "hover:bg-gray-50": color === "light" && !disabled,
        "hover:bg-red-500": color === "danger" && !disabled,
        "hover:bg-secondary": color === "primary" && !disabled,
      },

      {
        "py-1 px-2.5": size === "xs",
        "px-3 py-1.5": size === "sm",
        "px-4 py-1.5": size === "base",
        "px-5 py-2.5": size === "lg",
        "px-6 py-2.5": size === "xl",
      },

      { "gap-x-3": size === "base", "gap-x-2.5": size == "sm" },

      {
        "stroke-black": color === "light",
        "stroke-white": color === "primary",
      },

      {
        "disabled:bg-gray-50": color === "light",
        "disabled:bg-secondary": color === "primary",
      },

      disabled || loading ? "opacity-40 cursor-not-allowed" : "cursor-pointer",

      className,
    );

    return (
      <button
        disabled={disabled || loading}
        type={type}
        className={CLASS}
        ref={ref}
        onClick={onClick}
      >
        {icon && <i className="">{icon({ size: 16 })}</i>}
        <p className="font-medium">{children}</p>
      </button>
    );
  },
);
