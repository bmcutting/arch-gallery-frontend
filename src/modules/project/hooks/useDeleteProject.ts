import { useState } from "react";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import { deleteProject } from "@modules/project/services/delete-project";

interface Props {
  projectId: string;
  refetch: () => void;
}

export default function useDeleteProject({ projectId, refetch }: Props) {
  const { handleClose } = useModal();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const ok = await deleteProject({ projectId });
      if (ok) refetch();
    } catch (err) {
      console.error("Error deleting project", err);
    } finally {
      handleClose();
    }
  };

  return { handleDelete, loading };
}
