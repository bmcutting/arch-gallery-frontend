import type { ExperienceType } from "../../domain/enums/experience";

export interface ExperienceResponse {
  id: string;
  type: ExperienceType;
  title: string;
  institutionOrCompany: string;
  description: string;
  startYear: number;
  endYear: number;
  isCurrent: boolean;
}
