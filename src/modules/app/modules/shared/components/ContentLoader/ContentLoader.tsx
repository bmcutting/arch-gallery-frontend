import clsx from "clsx";

interface Props {
  height: number;
  marginRight?: number;
  className?: string;
  width?: number;
  circle?: boolean;
}

export default function ContentLoader({
  height,
  marginRight = 0,
  className,
  width,
  circle,
}: Props) {
  return (
    <div
      className={clsx(circle ? "rounded-full" : "rounded-card", className)}
      style={{
        animation: "loader 2s infinite ease-in-out",
        height: `${height}px`,
        width: width ? `${width}px` : `calc(100% - ${marginRight}px)`,
      }}
    ></div>
  );
}
