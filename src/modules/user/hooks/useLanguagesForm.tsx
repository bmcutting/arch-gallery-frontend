import { useCallback, useMemo, useState } from "react";
import type { LanguageForm } from "@modules/user/domain/form/language-form";
import type { LanguagesFormProps } from "@modules/user/domain/form/languages-form-props";

const toForm = (languages: string[]): LanguageForm[] =>
  languages.map((value) => ({ key: crypto.randomUUID(), value }));

export default function useLanguagesForm(initial: string[] = []) {
  const [values, setValues] = useState(() => toForm(initial));

  const onAdd = useCallback(() => {
    setValues((prev) => [...prev, { key: crypto.randomUUID(), value: "" }]);
  }, []);

  const onUpdate = useCallback(
    (key: string, value: string) =>
      setValues((prev) =>
        prev.map((v) => (v.key === key ? { ...v, value } : v)),
      ),
    [],
  );

  const onDelete = useCallback(
    (key: string) => setValues((prev) => prev.filter((v) => v.key !== key)),
    [],
  );

  const onSet = useCallback(
    (languages: string[]) => setValues(toForm(languages)),
    [],
  );

  const dto = useCallback(
    (): string[] =>
      values.map((v) => v.value).filter((value) => value.trim() !== ""),
    [values],
  );

  const form: LanguagesFormProps = useMemo(
    () => ({ values, onAdd, onUpdate, onDelete }),
    [values, onAdd, onUpdate, onDelete],
  );

  return { form, dto, onSet };
}
