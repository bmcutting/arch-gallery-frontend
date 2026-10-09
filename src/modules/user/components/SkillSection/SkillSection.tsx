import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import type { SkillForm } from "@modules/user/domain/form/skill-form";
import type { SkillsFormProps } from "@modules/user/domain/form/skills-form-props";
import Button from "@modules/app/modules/ui/components/Button/Button";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import { SkillFormModalProps } from "@modules/user/domain/modal/user-modal";

interface Props {
  form: SkillsFormProps;
}

export default function SkillSection({ form }: Props) {
  const { handleOpenModal } = useModal();
  const skills = form.values;

  const openEdit = (skill: SkillForm) =>
    handleOpenModal(
      new SkillFormModalProps(skill, (data) => form.onUpdate(skill.key, data)),
    );

  const openAdd = () => handleOpenModal(new SkillFormModalProps(null, form.onAdd));

  return (
    <div className="space-y-4">
      {skills.length === 0 && (
        <p className="text-muted-foreground italic text-sm">
          No hay habilidades añadidas.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill) => (
          <div
            key={skill.key}
            className="flex justify-between items-center border border-border rounded-lg p-3"
          >
            <div>
              <span className="font-medium text-sm md:text-lg lg:text-xl">{skill.name}</span>
              {skill.level && (
                <span className="ml-2 text-xs md:text-sm text-muted-foreground">
                  ({skill.level})
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => openEdit(skill)}
                className="text-muted-foreground hover:text-primary"
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={() => form.onDelete(skill.key)}
                className="text-error hover:text-error/80"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Button type="button" onClick={openAdd} size="sm">
        <FaPlus className="mr-1" /> Añadir habilidad
      </Button>
    </div>
  );
}
