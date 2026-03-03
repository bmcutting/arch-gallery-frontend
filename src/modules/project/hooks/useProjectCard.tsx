import { useState } from "react";
import { deleteProject } from "../services/delete-project";

interface Props {
  projectId: string;
}

export default function useProjectCard({ projectId }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteProject({ projectId });
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return {
    showModal,
    setShowModal,
    handleDelete,
    handleClose,
  };
}
