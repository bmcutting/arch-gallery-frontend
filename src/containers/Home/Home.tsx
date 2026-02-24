import AppLayout from "./components/AppLayout";
import useFeed from "./hooks/useFeed";

export default function Home() {
  const projects = useFeed();
  return (
    <AppLayout>
      <section className="mt-14 px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center tracking-wide">
          Galería de Arquitectura
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.projects?.map((project) => (
            <article
              key={project.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Imagen estilo cuadro */}
              {project.previewImage && (
                <div className="aspect-w-4 aspect-h-3">
                  {" "}
                  <img
                    src={"/sa.jpeg"}
                    alt={`Obra: ${project.title}`}
                    className="w-full h-full object-cover border-8 border-gray-100 group-hover:border-gray-300 transition-colors"
                  />
                </div>
              )}
              {/* Pie de obra */}
              <div className="p-6 flex flex-col gap-4 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  {project.title}
                </h2>
                {/* Autor como firma */}
                <div className="flex items-center justify-center gap-3">
                  {project.author.profileImage && (
                    <img
                      src={project.author.profileImage}
                      alt={`Firma de ${project.author.name}`}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  )}
                  <span className="text-sm text-gray-600 italic">
                    {project.author.name}
                  </span>
                </div>
                {/* Metadatos discretos */}
                <div className="flex justify-center gap-6 text-xs text-gray-500 mt-2">
                  <span>👍 {project.likesCount ?? 0}</span>
                  <span>💬 {project.commentsCount ?? 0}</span>
                  {project.createdAt && (
                    <time
                      dateTime={new Date(project.createdAt[0]).toISOString()}
                    >
                      {new Date(project.createdAt[0]).toLocaleDateString()}
                    </time>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
