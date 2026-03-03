import { FaComment, FaHeart, FaWindowClose } from "react-icons/fa";
import type { Project } from "../domain/entities/project";
import Button from "../../app/modules/ui/components/Button/Button";
import useProjectCard from "../hooks/useProjectCard";
import Modal from "../../app/modules/ui/components/Modal/Modal";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const { showModal, setShowModal, handleDelete, handleClose } = useProjectCard(
    { projectId: project.id },
  );

  return (
    <>
      <div className="group bg-card border border-border rounded-lg overflow-hidden transition-all hover:shadow-amber-50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <img
            src={project.imagesUrl?.[0] ?? "/pp.jfif"}
            alt={project.title}
            className="w-full h-full object-cover transition-all group-hover:scale-105"
          />
          <Button
            size="base"
            color="danger"
            className="absolute top-3 right-3 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-red-400"
            onClick={() => setShowModal(true)}
          >
            <FaWindowClose />
          </Button>
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
      </div>

      {showModal && (
        <Modal
          message={`¿Seguro que quieres eliminar el proyecto "${project.title}"?`}
          onConfirm={() => {
            handleDelete();
            handleClose();
          }}
          onCancel={handleClose}
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
        >
          <span className="mb-8 text-2xl font-bold text-red-600">
            Esta acción no se puede deshacer.
          </span>
        </Modal>
      )}
    </>
  );
}
