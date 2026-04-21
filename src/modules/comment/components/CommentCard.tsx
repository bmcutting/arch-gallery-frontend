import { FaUser } from "react-icons/fa";
import type { Comment } from "../domain/entities/comment";

interface Props {
  comment: Comment;
}

export default function CommentCard({ comment }: Props) {
  return (
    <div className="flex flex-row gap-3 p-2 rounded-md bg-muted text-foreground shadow-sm">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
        {comment.user?.profileImageUrl ? (
          <img
            src={comment.user.profileImageUrl}
            alt={comment.user.userName}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUser className="text-muted-foreground text-base" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">
          {comment.user?.userName}
        </span>
        <span className="text-xs text-muted-foreground leading-snug">
          {comment.message}
        </span>
      </div>
    </div>
  );
}
