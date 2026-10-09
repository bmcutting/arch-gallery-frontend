import type { Skill } from "@modules/user/domain/entities/skill";
import type { SkillResponse } from "@modules/user/dto/read/skill";

export class SkillMapper {
  static toDomain(r: SkillResponse): Skill {
    return {
      id: r.id,
      skillId: r.skillId,
      name: r.name,
      level: r.level ?? undefined,
    };
  }

  static toDomainList(r?: SkillResponse[] | null): Skill[] {
    if (!r || r.length === 0) {
      return [];
    }
    return r.map((c) => this.toDomain(c));
  }
}
