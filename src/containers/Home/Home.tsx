import AppLayout from "./components/AppLayout";
import useFeed from "./hooks/useFeed";
import ProjectFeed from "../../modules/project/components/ProjectFeed";

export default function Home() {
  const { projects, loading, loaderRef } = useFeed();
  return (
    <AppLayout>
      <section className="mt-14 px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center tracking-wide">
          Galería de Arquitectura
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects?.map((project) => (
            <ProjectFeed key={project.id} project={project} />
          ))}
        </div>
        <div ref={loaderRef} />
        {loading && <p>Cargando...</p>}
      </section>
    </AppLayout>
  );
}
