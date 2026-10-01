import type { Level } from "@modules/user/domain/enums/level";

export interface Skill {
  id: string;
  name: string;
  level?: Level;
}
