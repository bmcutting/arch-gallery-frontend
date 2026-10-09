import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Button from "@modules/app/modules/ui/components/Button/Button";
import type { Experience } from "@modules/user/domain/entities/experience";
import type { ExperienceFormItem } from "@modules/user/domain/forms/profile-form";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import { ExperienceFormModalProps } from "@modules/user/domain/modal/user-modal";

interface Props {
  experiences: ExperienceFormItem[];
  addExperience: (expData: Omit<Experience, "id">) => void;
  removeExperience: (key: string) => void;
  updateExperience: (key: string, expData: Omit<Experience, "id">) => void;
}

export default function ExperienceSection({
  experiences,
  addExperience,
  removeExperience,
  updateExperience,
}: Props) {
  const { handleOpenModal } = useModal();

  const openEdit = (exp: ExperienceFormItem) =>
    handleOpenModal(
      new ExperienceFormModalProps(exp, (data) =>
        updateExperience(exp.key, data),
      ),
    );

  const openAdd = () =>
    handleOpenModal(new ExperienceFormModalProps(null, addExperience));

  const formatRange = (exp: ExperienceFormItem) => {
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
            key={exp.key}
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
                  onClick={() => removeExperience(exp.key)}
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
    </div>
  );
}
