import type { Experience } from "@modules/user/domain/entities/experience";
import type { ExperienceForm } from "./experience-form";

export interface ExperiencesFormProps {
  values: ExperienceForm[];
  onAdd: (data: Omit<Experience, "id">) => void;
  onUpdate: (key: string, data: Omit<Experience, "id">) => void;
  onDelete: (key: string) => void;
}
