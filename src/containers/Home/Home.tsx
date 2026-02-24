import AppLayout from "./components/AppLayout";
import useFeed from "./hooks/useFeed";

export default function Home() {
  const projects = useFeed();
  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {projects.projects?.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Imagen de preview */}
            {project.previewImage && (
              <img
                src="/sa.jpeg"
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Contenido */}
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {project.title}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                {project.author.profileImage && (
                  <img
                    src={project.author.profileImage}
                    alt={project.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm text-gray-600">
                  {project.author.name}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <span>👍 {project.likesCount ?? 0}</span>
                <span>💬 {project.commentsCount ?? 0}</span>
                {project.createdAt && (
                  <span>
                    {new Date(project.createdAt[0]).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
