import type { Level } from "../../domain/enums/level";

export interface UpdateSkillDto {
  userId: string;
  name?: string;
  level?: Level;
}
