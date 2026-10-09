import { useCallback, useMemo, useState } from "react";
import type { Skill } from "@modules/user/domain/entities/skill";
import type { SkillForm } from "@modules/user/domain/form/skill-form";
import type { SkillsFormProps } from "@modules/user/domain/form/skills-form-props";
import type { UserSkillItemDto } from "@modules/user/dto/write/user-skill-item";

const toForm = (skills: Skill[]): SkillForm[] =>
  skills.map((skill) => ({ ...skill, key: skill.id }));

export default function useSkillsForm(initial: Skill[] = []) {
  const [values, setValues] = useState(() => toForm(initial));

  const onAdd = useCallback((data: Omit<Skill, "id">) => {
    setValues((prev) => [...prev, { ...data, key: crypto.randomUUID() }]);
  }, []);

  const onUpdate = useCallback(
    (key: string, data: Omit<Skill, "id">) =>
      setValues((prev) =>
        prev.map((v) => {
          if (v.key !== key) return v;
          return data.name === v.name
            ? { ...v, level: data.level }
            : { key, name: data.name, level: data.level };
        }),
      ),
    [],
  );

  const onDelete = useCallback(
    (key: string) => setValues((prev) => prev.filter((v) => v.key !== key)),
    [],
  );

  const onSet = useCallback(
    (skills: Skill[]) => setValues(toForm(skills)),
    [],
  );

  const dto = useCallback(
    (): UserSkillItemDto[] =>
      values
        .filter((v) => v.name.trim() !== "")
        .map((v) =>
          v.skillId
            ? { id: v.skillId, level: v.level || undefined }
            : { name: v.name, level: v.level || undefined },
        ),
    [values],
  );

  const form: SkillsFormProps = useMemo(
    () => ({ values, onAdd, onUpdate, onDelete }),
    [values, onAdd, onUpdate, onDelete],
  );

  return { form, dto, onSet };
}
