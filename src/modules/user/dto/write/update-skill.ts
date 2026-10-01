import type { Level } from "@modules/user/domain/enums/level";

export interface UpdateSkillDto {
  userId: string;
  name?: string;
  level?: Level;
}
