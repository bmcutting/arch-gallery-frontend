import Select from "../../../../modules/app/modules/ui/components/Select/Select";
import useProject from "../../hooks/useProject";
import CreateProjectModal from "../../../../modules/project/components/CreateProjectModal";
import ProjectFeed from "../../../../modules/project/components/ProjectFeed";
import ProjectContextMenu from "../ProjectContextMenu/ProjectContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import Modal from "../../../../modules/app/modules/ui/components/Modal/Modal";

interface Props {
  userId: string;
}

export default function ProjectTab({ userId }: Props) {
  const {
    projects,
    showCreateModal,
    setShowCreateModal,
    selectedFilter,
    selectedSort,
    filterOptions,
    sortOptions,
    handleSort,
    handleFilter,
    showDeleteModal,
    projectToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete,
  } = useProject();

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {projects?.map((item) => (
          <div key={item.project.id} className="relative">
            <ProjectFeed
              project={item.project}
              likedByUser={item.likedByUser}
            />
            <ProjectContextMenu
              isOpen={openMenuId === item.project.id}
              onToggle={() => toggleMenu(item.project.id)}
              onEdit={() => console.log("Editar", item.project)}
              onDelete={() => requestDelete(item.project)}
            />
          </div>
        ))}
        <div
          onClick={() => setShowCreateModal(true)}
          className="flex flex-col items-center justify-center border-2 border-dashed border-accent rounded-lg cursor-pointer hover:bg-accent/10 transition-all"
        >
          <span className="text-lg md:text-xl font-semibold text-primary">
            + Añadir Proyecto
          </span>
        </div>
      </div>

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          userId={userId}
        />
      )}
      {showDeleteModal && projectToDelete && (
        <Modal
          message={`¿Seguro que quieres eliminar el proyecto "${projectToDelete.title}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
        >
          <span className="mb-8 text-2xl font-bold text-red-600">
            Esta acción no se puede deshacer.
          </span>
        </Modal>
      )}
    </div>
  );
}
