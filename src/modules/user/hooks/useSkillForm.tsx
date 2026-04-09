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

  const [touched, setTouched] = useState({
    name: false,
  });

  const handleTouched = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  useEffect(() => {
    if (skill) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: skill.name,
        level: skill.level,
      });
      setTouched({ name: false });
    } else {
      setForm({ name: "", level: undefined });
      setTouched({ name: false });
    }
  }, [skill, isOpen]);

  return { form, setForm, LEVEL_OPTIONS, touched, handleTouched };
}
