import { FaComment, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Project } from "../domain/entities/project";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      to={`/project-gallery?id=${project.id}`}
      className="group bg-card border border-border rounded-lg overflow-hidden transition-all hover:shadow-amber-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          src={project.imagesUrl?.[0] ?? "/pp.jfif"}
          alt={project.title}
          className="w-full h-full object-cover transition-all group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 px-3 py-1.5 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-blue-500">
          {project.year}
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-secondary mb-2 line-clamp-1 group-hover:text-secondary transition-all">
          {project.title}
        </h3>
        <p className="text-sm md:text-base text-secondary mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-secondary">
              <FaHeart />
              <span>{project.likes?.length ?? 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-secondary">
              <FaComment />
              <span>{project.comments?.length ?? 0}</span>
            </div>
          </div>
          <div className="text-xs md:text-sm font-medium text-secondary">
            {project.categories?.map((c) => c.name).join(", ")}
          </div>
        </div>
      </div>
    </Link>
  );
}
