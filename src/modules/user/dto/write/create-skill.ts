import type { Level } from "@modules/user/domain/enums/level";

export interface CreateSkillDto {
  userId: string;
  name: string;
  level?: Level;
}
