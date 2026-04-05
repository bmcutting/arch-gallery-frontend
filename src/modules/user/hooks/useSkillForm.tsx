import { useEffect, useState } from "react";
import type { Skill } from "../domain/entities/skill";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill | null; // null para nueva
  onSave: (skillData: Omit<Skill, "id">) => void;
}

export default function useSkillForm({
  isOpen,
  onClose,
  skill,
  onSave,
}: Props) {
  const LEVEL_OPTIONS = [
    { value: "Beginner", label: "Básico" },
    { value: "Intermediate", label: "Intermedio" },
    { value: "Advanced", label: "Avanzado" },
    { value: "Expert", label: "Experto" },
  ];

  const [form, setForm] = useState<Omit<Skill, "id">>({
    name: "",
    level: undefined,
  });

  useEffect(() => {
    if (skill) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: skill.name,
        level: skill.level,
      });
    } else {
      setForm({ name: "", level: undefined });
    }
  }, [skill, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
    onClose();
  };

  return { form, setForm, handleSubmit, LEVEL_OPTIONS };
}
