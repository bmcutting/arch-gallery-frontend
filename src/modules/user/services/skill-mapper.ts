import type { Skill } from "../domain/entities/skill";
import type { SkillResponse } from "../dto/read/skill";

export class SkillMapper {
  static toDomain(r: SkillResponse): Skill {
    return {
      id: r.id,
      name: r.nane,
      level: r.level,
    };
  }

  static toDomainList(r?: SkillResponse[] | null): Skill[] {
    if (!r || r.length === 0) {
      return [];
    }
    return r.map((c) => this.toDomain(c));
  }
}
