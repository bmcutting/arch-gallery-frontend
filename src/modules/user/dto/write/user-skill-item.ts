import type { Level } from "@modules/user/domain/enums/level";

export interface UserSkillItemDto {
  id?: string;
  name?: string;
  level?: Level;
}
