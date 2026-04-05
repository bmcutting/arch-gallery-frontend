import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import type { Skill } from "../../domain/entities/skill";
import Button from "../../../app/modules/ui/components/Button/Button";
import { useState } from "react";
import SkillFormModal from "./SkillFormModal";

interface Props {
  skills: Skill[];
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Omit<Skill, "id">) => void;
  removeSkill: (id: string) => void;
}

export default function SkillSection({
  skills,
  addSkill,
  updateSkill,
  removeSkill,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const handleSave = (skillData: Omit<Skill, "id">) => {
    if (editingSkill) {
      updateSkill(editingSkill.id, skillData);
    } else {
      addSkill(skillData);
    }
    setEditingSkill(null);
    setModalOpen(false);
  };

  const openEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingSkill(null);
    setModalOpen(true);
  };

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
            key={skill.id}
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
                onClick={() => removeSkill(skill.id)}
                className="text-red-500 hover:text-red-700"
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

      <SkillFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingSkill(null);
        }}
        skill={editingSkill}
        onSave={handleSave}
      />
    </div>
  );
}
