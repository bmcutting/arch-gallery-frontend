import { useState } from "react";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import type { Skill } from "@modules/user/domain/entities/skill";
import { Level } from "@modules/user/domain/enums/level";

interface Props {
  skill: Omit<Skill, "id"> | null;
  onSave: (skillData: Omit<Skill, "id">) => void;
}

export default function useSkillForm({ skill, onSave }: Props) {
  const { handleClose } = useModal();

  const LEVEL_OPTIONS = [
    { value: Level.BEGINNER, label: "Principiante" },
    { value: Level.INTERMEDIATE, label: "Intermedio" },
    { value: Level.ADVANCED, label: "Avanzado" },
    { value: Level.EXPERT, label: "Experto" },
  ];

  const [form, setForm] = useState<Omit<Skill, "id">>({
    name: skill?.name ?? "",
    level: skill?.level,
  });

  const [touched, setTouched] = useState({ name: false });

  const handleTouched = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setTouched({ name: true });
      return;
    }

    onSave(form);
    handleClose();
  };

  return { form, setForm, LEVEL_OPTIONS, touched, handleTouched, handleSubmit };
}
