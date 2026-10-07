import { useState, type ImgHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import { FaImage } from "react-icons/fa";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
}

export default function Image({
  src,
  alt = "",
  className,
  fallback,
  onError,
  ...props
}: Props) {
  const [failedSrc, setFailedSrc] = useState<string>();

  if (!src || failedSrc === src) {
    return (
      <>
        {fallback ?? (
          <div
            role="img"
            aria-label={alt}
            className={clsx(
              className,
              "flex items-center justify-center bg-muted text-muted-foreground",
            )}
          >
            <FaImage className="w-1/4 h-1/4 max-w-12 max-h-12 opacity-40" />
          </div>
        )}
      </>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        setFailedSrc(src);
        onError?.(e);
      }}
      {...props}
    />
  );
}
