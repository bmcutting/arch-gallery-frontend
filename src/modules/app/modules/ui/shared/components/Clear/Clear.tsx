import Close from "../../../../../../icon/components/Close";

interface Props {
  onClick?: () => void;
}

export default function Clear({ onClick }: Props) {
  return (
    <i
      className="stroke-muted-foreground cursor-pointer rounded-full
      bg-card w-5 h-5 flex justify-center items-center hover:bg-muted"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <Close size={16} />
    </i>
  );
}
