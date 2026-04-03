import { useState } from "react";
import type { Skill } from "../domain/entities/skill";

interface Props {
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Omit<Skill, "id">) => void;
}

export default function useSkillForm({ addSkill, updateSkill }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const LEVEL_OPTIONS = [
    { value: "beginner", label: "Básico" },
    { value: "intermediate", label: "Intermedio" },
    { value: "advanced", label: "Avanzado" },
    { value: "expert", label: "Experto" },
  ];

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
  return { modalOpen, handleSave, openEdit, openAdd, LEVEL_OPTIONS };
}
