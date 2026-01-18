import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react";
import type { Size } from "../../domain/size";

type IconName = keyof typeof LucideIcons;

interface Props {
  name: IconName;
  size: number;
  color: string;
  className?: string;
  strokeWidth?: number;
}

function Icon({ name, size, color, className, strokeWidth, ...props }: Props) {
  const IconComponent = LucideIcons[name] as React.ComponentType<LucideIcons.LucideProps>;
  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        color="gray"
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}

export default Icon;
