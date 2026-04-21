import { FaExclamationTriangle, FaFolderOpen } from "react-icons/fa";
import Button from "../../../modules/app/modules/ui/components/Button/Button";
import ProjectFeed from "../../../modules/project/components/ProjectFeed";
import ProjectFeedSkeleton from "../../../modules/project/components/ProjectFeedSkeleton";
import type { ProjectFeedItem } from "../../../modules/project/services/get-all-projects";

interface Props {
  loading: boolean;
  error: string | null;
  projects: ProjectFeedItem[];
  pageSize: number;
  page: number;
  totalPages: number;
  setPage: (n: number) => void;
  onClearFilters: () => void;
}

export default function SearchResults({
  loading,
  error,
  projects,
  pageSize,
  page,
  totalPages,
  setPage,
  onClearFilters,
}: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: pageSize }).map((_, i) => (
          <ProjectFeedSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto my-10 flex items-start gap-3 p-4 rounded-xl border border-error bg-error/10 text-error">
        <FaExclamationTriangle className="mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
          <FaFolderOpen />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          Sin resultados
        </h3>
        <p className="text-muted-foreground max-w-sm mb-4">
          No encontramos proyectos con los filtros seleccionados.
        </p>
        <Button size="lg" onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {projects.map((item) => (
          <ProjectFeed
            key={item.project.id}
            project={item.project}
            likedByUser={item.likedByUser}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            size="lg"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </span>
          <Button
            size="lg"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </>
  );
}
