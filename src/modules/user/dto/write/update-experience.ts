import type { ExperienceType } from "../../domain/enums/experience";

export interface UpdateExperienceDto {
  userId: string;
  type?: ExperienceType;
  title?: string;
  institutionOrCompany?: string;
  startYear?: number;
  description?: string;
  endYear?: number;
  isCurrent?: boolean;
}
