import { FaImage, FaHeart, FaComment, FaUser } from "react-icons/fa";
import Button from "../../app/modules/ui/components/Button/Button";
import useLike from "../../like/hooks/useLike";
import type { ProjectFeed } from "../domain/entities/project-feed";
import CommentCard from "../../comment/components/CommentCard";
import Textarea from "../../app/modules/ui/components/TextArea/TextArea";
import { BiSend } from "react-icons/bi";
import ProjectDetailModal from "./ProjectDetailModal";
import type { Project } from "../domain/entities/project";

interface ProjectFeedProps {
  project: ProjectFeed;
}

export default function ProjectFeed({ project }: ProjectFeedProps) {
  const {
    handleLike,
    showComments,
    comment,
    setComment,
    showTextarea,
    setShowTextarea,
    setShowComments,
    comments,
    showDetail,
    setShowDetail,
    handleComment,
    likesCount,
    likedByUser,
  } = useLike({
    project,
  });

  const mockProject: Project = {
    id: "1",
    title: "Sistema de Gestión Industrial",
    description:
      "Proyecto de integración de sistemas industriales con backend en .NET y frontend en React.",
    year: 2026,
    imagesUrl: ["/sa.jpg", "/sa.jpg", "/sa.jpg"],
    categories: [
      { id: "c1", name: "Automatización" },
      { id: "c2", name: "Frontend" },
      { id: "c3", name: "Backend" },
    ],
    likes: [],
    comments: [],
    createdAt: [new Date()],
  };

  return (
    <article
      key={project.id}
      className="group relative bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-2xl hover:border-gray-300 hover:shadow-primary transition-all duration-300 overflow-hidden"
    >
      <div className="relative bg-gray-100">
        {project.previewImage ? (
          <div className="aspect-4/3 w-full overflow-hidden">
            <img
              src="/sa.jpg"
              alt={`Vista del proyecto "${project.title}"`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-4/3 w-full flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">
            <FaImage className="text-5xl mb-2 opacity-40" />
            <span className="text-xs font-medium tracking-wider uppercase">
              Sin previsualización
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-gray-800 leading-tight mb-2 line-clamp-2">
            {project.title}
          </h2>
          <span className="text-lg md:text-xl border-b-2 border-primary">
            {project.year}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            {project.author.profileImage ? (
              <img
                src={project.author.profileImage}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-gray-500 text-sm" />
            )}
          </div>
          <span className="text-sm font-medium">{project.author.name}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {project.categories?.slice(0, 5).map((cat) => (
            <span
              key={cat.id}
              className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-600"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-center text-xs">
            <div className="flex w-full items-center gap-3">
              <Button size="base" className="flex" full onClick={handleLike}>
                <div className="flex items-center gap-3">
                  <FaHeart
                    className={`transition-all ${
                      likedByUser
                        ? "text-red-500 scale-125"
                        : "text-gray-400 hover:text-red-500 hover:scale-200"
                    }`}
                  />
                  {likesCount}
                </div>
              </Button>
              <Button
                size="base"
                full
                onClick={() => setShowComments((prev) => !prev)}
              >
                <div className="flex items-center gap-3">
                  <FaComment className="text-gray-400 hover:text-blue-500 hover:scale-200 transition-all" />
                  {comments?.length ?? 0}
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Button size="base" full onClick={() => setShowDetail(true)}>
            Ver más
          </Button>
        </div>
      </div>
      <div
        className={`absolute inset-0 bg-white/95 backdrop-blur-sm transition-transform duration-500 ${
          showComments ? "translate-y-0" : "translate-y-full"
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
          <div className="flex-1 overflow-y-auto space-y-2">
            {comments?.length ? (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
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
      {showDetail && (
        <ProjectDetailModal
          project={mockProject}
          onClose={() => setShowDetail(false)}
        />
      )}
    </article>
  );
}
