import { BiSend } from "react-icons/bi";
import Textarea from "../../app/modules/ui/components/TextArea/TextArea";
import type { ProjectFeed } from "../../project/domain/entities/project-feed";
import useComment from "../hooks/useComment";
import CommentCard from "./CommentCard";

interface Props extends ReturnType<typeof useComment> {
  project: ProjectFeed;
}

export default function CommentSection({
  showComments,
  comment,
  setComment,
  showTextarea,
  setShowTextarea,
  setShowComments,
  comments,
  handleComment,
  commentsContainerRef,
}: Props) {
  return (
    <div
      className={`absolute inset-0 bg-white/95 backdrop-blur-sm
              transition-all duration-500 ease-in-out
              ${
                showComments
                  ? "translate-y-0 opacity-100 pointer-events-auto"
                  : "translate-y-full opacity-0 pointer-events-none"
              }`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Comentarios</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowComments(false)}
          >
            ✕
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto space-y-2"
          ref={commentsContainerRef}
        >
          {comments.length ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="transition-all duration-500 ease-out transform 
                   animate-fadeInUp"
              >
                <CommentCard comment={comment} />
              </div>
            ))
          ) : (
            <span className="text-sm text-gray-500">No hay comentarios</span>
          )}
        </div>

        <div className="relative mt-3">
          <Textarea
            value={comment}
            placeholder="Comenta..."
            onChange={setComment}
            onFocus={() => setShowTextarea(true)}
            onBlur={() => setShowTextarea(false)}
            className={`px-3 py-2 pr-10 text-sm md:text-base lg:text-lg 
                  rounded-md border border-gray-300 focus:ring-2 focus:ring-primary 
                  resize-none leading-relaxed overflow-y-auto transition-all duration-400
                  ${showTextarea ? "h-40 md:h-56 lg:h-64" : "h-10 md:h-10 lg:h-12"}`}
          />
          <button
            onClick={handleComment}
            className="absolute bottom-4 right-3 text-gray-400 hover:text-primary transition-colors"
          >
            <BiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
