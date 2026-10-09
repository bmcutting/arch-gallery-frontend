import { useState } from "react";
import useModal from "@modules/app/modules/modal/hooks/useModal";
import type { Skill } from "@modules/user/domain/entities/skill";
import { Level } from "@modules/user/domain/enums/level";
import { SkillValidator } from "@modules/user/domain/validator/skill/skill-validator";
import type { FormSubmit } from "@modules/app/modules/ui/components/Form/domain/form-submit";

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

  const handleSubmit = ({ setErrors }: FormSubmit) => {
    new SkillValidator({ name: form.name }).execute({
      success: () => {
        onSave(form);
        handleClose();
      },
      error: setErrors,
    });
  };

  return { form, setForm, LEVEL_OPTIONS, handleSubmit };
}
