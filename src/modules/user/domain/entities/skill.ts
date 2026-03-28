import type { Level } from "../enums/level";

export interface Skill {
  id: string;
  name: string;
  level?: Level;
}
