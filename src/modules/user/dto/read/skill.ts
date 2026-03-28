import type { Level } from "../../domain/enums/level";

export interface SkillResponse {
  id: string;
  nane: string;
  level: Level;
}
