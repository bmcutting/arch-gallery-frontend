import { FaImage, FaHeart, FaComment, FaUser } from "react-icons/fa";
import Button from "../../app/modules/ui/components/Button/Button";
import uselike from "../../like/hooks/useLike";
import type { ProjectFeed } from "../domain/entities/project-feed";

interface ProjectFeedProps {
  project: ProjectFeed;
}

export default function ProjectFeed({ project }: ProjectFeedProps) {
  const { handleLike } = uselike({ projectId: project.id });

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

        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-center text-xs">
            <div className="flex w-full items-center gap-3">
              <Button size="base" className="flex" full onClick={handleLike}>
                <div className="flex items-center gap-3">
                  <FaHeart className="text-gray-400 hover:text-red-500 hover:scale-200 transition-all" />
                  {project.likes?.length ?? 0}
                </div>
              </Button>
              <Button
                size="base"
                full
                onClick={() => {
                  if (project.comments?.length !== 0) {
                    project.comments?.forEach((element) => {
                      console.log(element.message);
                    });
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <FaComment className="text-gray-400 hover:text-blue-500 hover:scale-200 transition-all" />
                  {project.comments?.length ?? 0}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
