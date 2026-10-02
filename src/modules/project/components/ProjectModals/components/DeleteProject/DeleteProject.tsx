import ConfirmModal from "@modules/app/modules/modal/components/ConfirmModal/ConfirmModal";
import useDeleteProject from "@modules/project/hooks/useDeleteProject";

interface Props {
  projectId: string;
  title: string;
  refetch: () => void;
}

export default function DeleteProject({ projectId, title, refetch }: Props) {
  const { handleDelete, loading } = useDeleteProject({ projectId, refetch });

  return (
    <ConfirmModal
      message={`¿Seguro que quieres eliminar el proyecto "${title}"?`}
      onConfirm={handleDelete}
      confirmLabel="Eliminar"
      cancelLabel="Cancelar"
      loading={loading}
    >
      <span className="text-2xl font-bold text-error">
        Esta acción no se puede deshacer.
      </span>
    </ConfirmModal>
  );
}
