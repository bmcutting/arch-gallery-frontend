import Select from "@modules/app/modules/ui/components/Select/Select";
import useUserProjects from "@modules/project/hooks/useUserProjects";
import ProjectFeed from "@modules/project/components/ProjectFeed";
import ProjectFeedSkeleton from "@modules/project/components/ProjectFeedSkeleton";
import ProjectContextMenu from "@containers/Profile/components/ProjectContextMenu/ProjectContextMenu";
import useContextMenu from "@containers/Profile/hooks/useContextMenu";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import {
  CreateProjectModalProps,
  DeleteProjectModalProps,
  EditProjectModalProps,
} from "@modules/project/domain/modal/project-modal";

interface Props {
  userId: string;
  readOnly?: boolean;
}

export default function ProjectTab({ userId, readOnly = false }: Props) {
  const {
    projects,
    loading,
    selectedFilter,
    selectedSort,
    filterOptions,
    sortOptions,
    handleSort,
    handleFilter,
    refetch,
  } = useUserProjects(readOnly ? userId : undefined);

  const { handleOpenModal } = useModal();

  const { openMenuId, toggleMenu } = useContextMenu();

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <Select
            label="Filtrar por Tipo"
            options={filterOptions}
            value={selectedFilter}
            onChange={handleFilter}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Ordenar por"
            options={sortOptions}
            value={selectedSort}
            onChange={handleSort}
          />
        </div>
      </div>
      {readOnly && !loading && projects.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          Este usuario aún no tiene proyectos publicados.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <ProjectFeedSkeleton key={i} />
          ))}
        {projects?.map((item) => (
          <div key={item.project.id} className="relative">
            <ProjectFeed
              project={item.project}
              likedByUser={item.likedByUser}
            />
            {!readOnly && (
              <ProjectContextMenu
                isOpen={openMenuId === item.project.id}
                onToggle={() => toggleMenu(item.project.id)}
                onEdit={() =>
                  handleOpenModal(new EditProjectModalProps(item.project, refetch))
                }
                onDelete={() =>
                  handleOpenModal(
                    new DeleteProjectModalProps(
                      item.project.id,
                      item.project.title,
                      refetch,
                    ),
                  )
                }
              />
            )}
          </div>
        ))}
        {!readOnly && (
          <div
            onClick={() =>
              handleOpenModal(new CreateProjectModalProps(userId, refetch))
            }
            className="flex flex-col items-center justify-center border-2 border-dashed border-accent rounded-lg cursor-pointer hover:bg-accent/10 transition-all"
          >
            <span className="text-lg md:text-xl font-semibold text-primary">
              + Añadir Proyecto
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
