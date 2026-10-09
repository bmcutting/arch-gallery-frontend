import type { Skill } from "@modules/user/domain/entities/skill";

export interface SkillForm extends Omit<Skill, "id"> {
  id?: string;
  key: string;
}
