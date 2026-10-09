import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import type { Skill } from "@modules/user/domain/entities/skill";
import type { SkillFormItem } from "@modules/user/domain/forms/profile-form";
import Button from "@modules/app/modules/ui/components/Button/Button";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import { SkillFormModalProps } from "@modules/user/domain/modal/user-modal";

interface Props {
  skills: SkillFormItem[];
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (key: string, skill: Omit<Skill, "id">) => void;
  removeSkill: (key: string) => void;
}

export default function SkillSection({
  skills,
  addSkill,
  updateSkill,
  removeSkill,
}: Props) {
  const { handleOpenModal } = useModal();

  const openEdit = (skill: SkillFormItem) =>
    handleOpenModal(
      new SkillFormModalProps(skill, (data) => updateSkill(skill.key, data)),
    );

  const openAdd = () =>
    handleOpenModal(new SkillFormModalProps(null, addSkill));

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
                onClick={() => removeSkill(skill.key)}
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
