import type { Level } from "../../domain/enums/level";

export interface CreateSkillDto {
  userId: string;
  name: string;
  level?: Level;
}
