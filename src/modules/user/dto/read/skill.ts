import type { Level } from "@modules/user/domain/enums/level";

export interface SkillResponse {
  id: string;
  name: string;
  level: Level;
}
