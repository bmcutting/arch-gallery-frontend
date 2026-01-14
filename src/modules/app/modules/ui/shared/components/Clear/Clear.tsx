import Close from "../../../../../../icon/components/Close";

interface Props {
  onClick?: () => void;
}

export default function Clear({ onClick }: Props) {
  return (
    <i
      className="stroke-gray-600 cursor-pointer rounded-full 
      bg-white w-[20px] h-[20px] flex justify-center items-center hover:bg-gray-100"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <Close size={16} />
    </i>
  );
}
