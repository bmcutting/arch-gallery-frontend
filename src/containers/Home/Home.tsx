import AppLayout from "../../layouts/AppLayout";
import useProjectFeed from "../../modules/project/hooks/useProjectFeed";
import ProjectFeed from "../../modules/project/components/ProjectFeed";

export default function Home() {
  const { projects, loading, loaderRef } = useProjectFeed();
  return (
    <AppLayout>
      <section className="mt-14 px-6">
        <h1 className="text-3xl font-bold text-foreground mb-12 text-center tracking-wide">
          Galería de Arquitectura
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects?.map((item) => (
            <ProjectFeed
              key={item.project.id}
              project={item.project}
              likedByUser={item.likedByUser}
            />
          ))}
        </div>
        <div ref={loaderRef} />
        {loading && <p>Cargando...</p>}
      </section>
    </AppLayout>
  );
}
