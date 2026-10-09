import { useCallback, useMemo, useState } from "react";
import type { Experience } from "@modules/user/domain/entities/experience";
import type { ExperienceForm } from "@modules/user/domain/form/experience-form";
import type { ExperiencesFormProps } from "@modules/user/domain/form/experiences-form-props";
import type { CreateExperienceDto } from "@modules/user/dto/write/create-experience";

const toForm = (experiences: Experience[]): ExperienceForm[] =>
  experiences.map((experience) => ({ ...experience, key: experience.id }));

export default function useExperiencesForm(initial: Experience[] = []) {
  const [values, setValues] = useState(() => toForm(initial));

  const onAdd = useCallback((data: Omit<Experience, "id">) => {
    setValues((prev) => [...prev, { ...data, key: crypto.randomUUID() }]);
  }, []);

  const onUpdate = useCallback(
    (key: string, data: Omit<Experience, "id">) =>
      setValues((prev) =>
        prev.map((v) => (v.key === key ? { ...v, ...data } : v)),
      ),
    [],
  );

  const onDelete = useCallback(
    (key: string) => setValues((prev) => prev.filter((v) => v.key !== key)),
    [],
  );

  const onSet = useCallback(
    (experiences: Experience[]) => setValues(toForm(experiences)),
    [],
  );

  const dto = useCallback(
    (): (CreateExperienceDto & { id?: string })[] =>
      values.map((v) => ({
        id: v.id,
        type: v.type,
        title: v.title,
        institutionOrCompany: v.institutionOrCompany,
        description: v.description,
        startYear: v.startYear,
        endYear: v.endYear,
        isCurrent: v.isCurrent,
      })),
    [values],
  );

  const form: ExperiencesFormProps = useMemo(
    () => ({ values, onAdd, onUpdate, onDelete }),
    [values, onAdd, onUpdate, onDelete],
  );

  return { form, dto, onSet };
}
