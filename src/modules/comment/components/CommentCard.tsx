import { FaUser } from "react-icons/fa";
import type { Comment } from "../domain/entities/comment";

interface Props {
  comment: Comment;
}

export default function CommentCard({ comment }: Props) {
  return (
    <div className="flex flex-row gap-2 ml-2 bg-card text-black">
      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
        <FaUser className="text-gray-500 text-sm" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">Agapito</span>
        <span className="text-xs font-medium">{comment.message}</span>
      </div>
    </div>
  );
}
