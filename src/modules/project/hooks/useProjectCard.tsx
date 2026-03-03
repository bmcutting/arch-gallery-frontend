import { useState } from "react";
import { deleteProject } from "../services/delete-project";

interface Props {
  projectId: string;
}

export default function useProjectCard({ projectId }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const handleDelete = () => {
    if (confirmDelete) {
      deleteProject({ projectId });
      setConfirmDelete(false);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setConfirmDelete(false);
  };
  return {
    showModal,
    setShowModal,
    handleDelete,
    handleClose,
    setConfirmDelete,
  };
}
