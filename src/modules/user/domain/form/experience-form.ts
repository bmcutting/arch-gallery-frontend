import type { Experience } from "@modules/user/domain/entities/experience";

export interface ExperienceForm extends Omit<Experience, "id"> {
  id?: string;
  key: string;
}
