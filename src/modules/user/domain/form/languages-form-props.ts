import type { LanguageForm } from "./language-form";

export interface LanguagesFormProps {
  values: LanguageForm[];
  onAdd: () => void;
  onUpdate: (key: string, value: string) => void;
  onDelete: (key: string) => void;
}
