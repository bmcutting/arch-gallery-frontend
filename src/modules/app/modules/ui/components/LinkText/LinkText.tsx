import clsx from "clsx";
import { useMemo } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to: string;
  highlight?: boolean;
  className?: string;
}

export default function LinkText({
  children,
  to,
  highlight,
  className,
}: Props) {
  const CLASS = useMemo(
    () =>
      clsx(
        "text-sm text-center select-none transition-colors duration-300",
        highlight
          ? "text-primary font-semibold hover:underline hover:text-secondary"
          : "text-muted-foreground",
        className
      ),
    [highlight, className]
  );
  return (
    <Link to={to} className={CLASS}>
      {children}
    </Link>
  );
}
