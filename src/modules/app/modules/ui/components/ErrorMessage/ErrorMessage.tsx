import { FaExclamationCircle } from "react-icons/fa";

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  if (!message) return null;
  return (
    <div className=" flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base
     text-red-600 font-medium wrap-break-word animate-fadeIn">
      <FaExclamationCircle className="w-4 h-4 text-red-500" />
      <span>{message}</span>
    </div>
  );
}
