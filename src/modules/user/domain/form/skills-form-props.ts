import type { Skill } from "@modules/user/domain/entities/skill";
import type { SkillForm } from "./skill-form";

export interface SkillsFormProps {
  values: SkillForm[];
  onAdd: (data: Omit<Skill, "id">) => void;
  onUpdate: (key: string, data: Omit<Skill, "id">) => void;
  onDelete: (key: string) => void;
}
