import { useEffect, useState } from "react";
import type { Skill } from "../domain/entities/skill";
import { Level } from "../domain/enums/level";

interface Props {
  isOpen: boolean;
  skill?: Skill | null;
}

export default function useSkillForm({ isOpen, skill }: Props) {
  const LEVEL_OPTIONS = [
    { value: Level.BEGINNER, label: "Principiante" },
    { value: Level.INTERMEDIATE, label: "Intermedio" },
    { value: Level.ADVANCED, label: "Avanzado" },
    { value: Level.EXPERT, label: "Experto" },
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

  return { form, setForm, LEVEL_OPTIONS };
}
