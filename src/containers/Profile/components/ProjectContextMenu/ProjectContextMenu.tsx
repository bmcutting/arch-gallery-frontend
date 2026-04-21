import { FaEllipsisV } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectContextMenu({
  isOpen,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="absolute top-2 right-2 context-menu">
      <button
        onClick={onToggle}
        className="p-2 rounded-full bg-white shadow-md hover:bg-muted"
      >
        <FaEllipsisV className="text-foreground" />
      </button>
      {isOpen && (
        <div className="absolute top-10 right-0 bg-white border rounded shadow-md z-50">
          <button
            onClick={onEdit}
            className="block px-4 py-2 text-sm hover:bg-muted w-full text-left"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="block px-4 py-2 text-sm hover:bg-muted w-full text-left text-error"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
