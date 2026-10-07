import { FaImage, FaHeart, FaComment, FaUser } from "react-icons/fa";
import Button from "@modules/app/modules/ui/components/Button/Button";
import Image from "@modules/app/modules/ui/components/Image/Image";
import useLike from "@modules/like/hooks/useLike";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import { ViewProjectModalProps } from "@modules/project/domain/modal/project-modal";
import CommentSection from "@modules/comment/components/CommentSection";
import useComment from "@modules/comment/hooks/useComment";
import type { Project } from "@modules/project/domain/entities/project";

interface ProjectFeedProps {
  project: Project;
  likedByUser: boolean;
}

export default function ProjectFeed({
  project,
  likedByUser,
}: ProjectFeedProps) {
  const { handleLike, likesCount, liked } = useLike({ project, likedByUser });
  const commentState = useComment({ project });
  const { handleOpenModal } = useModal();

  const primaryImage = project.imagesUrl?.[0];

  return (
    <article
      key={project.id}
      className="group relative bg-card rounded-xl border border-border shadow-warm hover:shadow-warm-md hover:border-primary transition-smooth overflow-hidden"
    >
      <div className="relative bg-muted">
        <div className="aspect-4/3 w-full overflow-hidden">
          <Image
            src={primaryImage}
            alt={`Vista del proyecto "${project.title}"`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center bg-muted text-muted-foreground">
                <FaImage className="text-5xl mb-2 opacity-40" />
                <span className="text-xs font-medium tracking-wider uppercase">
                  Sin previsualización
                </span>
              </div>
            }
          />
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-foreground leading-tight mb-2 line-clamp-2">
            {project.title}
          </h2>
          <span className="text-lg md:text-xl border-b-2 border-primary">
            {project.year}
          </span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src={project.user?.profileImageUrl}
              className="w-full h-full object-cover"
              fallback={<FaUser className="text-muted-foreground text-sm" />}
            />
          </div>
          <span className="text-sm font-medium">
            {project.user?.userName ?? "Unknown"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {project.categories?.slice(0, 5).map((cat) => (
            <span
              key={cat.id}
              className="px-2 py-1 text-sm rounded-full bg-muted text-muted-foreground"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-center text-xs">
            <div className="flex w-full items-center gap-3">
              <Button size="base" className="flex" full onClick={handleLike}>
                <div className="flex items-center gap-3">
                  <FaHeart
                    className={`transition-all ${
                      liked
                        ? "text-like scale-125"
                        : "text-muted-foreground hover:text-like hover:scale-200"
                    }`}
                  />
                  {likesCount}
                </div>
              </Button>
              <Button
                size="base"
                full
                onClick={() => commentState.setShowComments((prev) => !prev)}
              >
                <div className="flex items-center gap-3">
                  <FaComment className="text-muted-foreground hover:text-accent hover:scale-200 transition-all" />
                  {commentState.comments?.length ?? 0}
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Button size="base" full onClick={() => handleOpenModal(new ViewProjectModalProps(project.id))}>
            Ver más
          </Button>
        </div>
      </div>

      <CommentSection project={project} {...commentState} />
    </article>
  );
}
