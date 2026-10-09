import type { ExperienceType } from "@modules/user/domain/enums/experience";

export interface UpdateExperienceDto {
  type?: ExperienceType;
  title?: string;
  institutionOrCompany?: string;
  startYear?: number;
  description?: string;
  endYear?: number;
  isCurrent?: boolean;
}
