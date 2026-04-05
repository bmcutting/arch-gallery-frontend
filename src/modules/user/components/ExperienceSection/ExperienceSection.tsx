import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../../../app/modules/ui/components/Button/Button";
import type { Experience } from "../../domain/entities/experience";
import { useState } from "react";
import ExperienceFormModal from "./ExperienceFormModal";

interface Props {
  experiences: Experience[];
  addExperience: (expData: Omit<Experience, "id">) => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, expData: Omit<Experience, "id">) => void;
}

export default function ExperienceSection({
  experiences,
  addExperience,
  removeExperience,
  updateExperience,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );

  const handleSave = (exp: Omit<Experience, "id">) => {
    console.log(exp);
    if (editingExperience) {
      updateExperience(editingExperience.id, exp);
    } else {
      addExperience(exp);
    }
    setEditingExperience(null);
    setModalOpen(false);
  };

  const openEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingExperience(null);
    setModalOpen(true);
  };

  const formatRange = (exp: Experience) => {
    const start = exp.startYear;
    const end = exp.isCurrent ? "Actualidad" : exp.endYear || "";
    return end ? `${start} – ${end}` : `${start}`;
  };

  return (
    <div className="space-y-4">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {experiences.length === 0 && (
          <p className="text-black italic text-sm">
            No hay experiencias añadidas.
          </p>
        )}
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow mt-2"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-black">{exp.institutionOrCompany}</p>
                <p className="text-sm text-black mt-1">{formatRange(exp)}</p>
                {exp.description && (
                  <p className="text-sm text-black mt-2 line-clamp-2">
                    {exp.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  type="button"
                  onClick={() => openEdit(exp)}
                  className="p-2 text-primary/80 hover:text-primary rounded-md"
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  title="Eliminar"
                  className="p-2 text-primary/80 hover:text-primary rounded-md"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button size="sm" onClick={openAdd}>
        <FaPlus className="mr-1" /> Añadir experiencia
      </Button>

      <ExperienceFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingExperience(null);
        }}
        experience={editingExperience}
        onSave={handleSave}
      />
    </div>
  );
}
