import type { ExperienceType } from "@modules/user/domain/enums/experience";

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  institutionOrCompany: string;
  description?: string;
  startYear: number;
  endYear?: number;
  isCurrent?: boolean;
}
