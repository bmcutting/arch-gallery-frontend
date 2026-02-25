import {
  FaImage,
  FaHeart,
  FaComment,
  FaRegCalendarAlt,
  FaUser,
} from "react-icons/fa";

interface ProjectFeedProps {
  project: {
    id: string;
    title: string;
    previewImage?: string;
    likesCount?: number;
    commentsCount?: number;
    createdAt?: Date[];
    author: {
      id: string;
      name: string;
      profileImage?: string | null;
    };
  };
}

export default function ProjectFeed({ project }: ProjectFeedProps) {
  const formattedDate = project.createdAt
    ? new Date(project.createdAt[0]).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <article
      key={project.id}
      className="group relative bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-2xl hover:border-gray-300 transition-all duration-300 overflow-hidden"
    >
      {/* Imagen / placeholder con relación 4:3 */}
      <div className="relative bg-gray-100">
        {project.previewImage ? (
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img
              src="/sa.jpg"
              alt={`Vista del proyecto "${project.title}"`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <FaImage className="text-5xl mb-2 opacity-40" />
            <span className="text-xs font-medium tracking-wider uppercase">
              Sin previsualización
            </span>
          </div>
        )}
      </div>

      {/* Pie de obra: información del proyecto */}
      <div className="p-5">
        {/* Título del proyecto */}
        <h2 className="text-xl font-semibold text-gray-800 leading-tight mb-2 line-clamp-2">
          {project.title}
        </h2>

        {/* Autor con ícono por defecto */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
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

        {/* Metadatos en dos líneas (más detalles) */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <FaHeart className="text-gray-400" />
                {project.likesCount ?? 0}
              </span>
              <span className="flex items-center gap-1">
                <FaComment className="text-gray-400" />
                {project.commentsCount ?? 0}
              </span>
            </div>
          </div>

          {/* Detalle adicional: separador visual (opcional) */}
        </div>
      </div>
    </article>
  );
}
