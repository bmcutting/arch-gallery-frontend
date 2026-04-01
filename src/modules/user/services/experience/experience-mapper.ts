import type { Experience } from "../../domain/entities/experience";
import type { ExperienceResponse } from "../../dto/read/experience";

export class ExperienceMapper {
  static toDomain(r: ExperienceResponse): Experience {
    return {
      id: r.id,
      type: r.type,
      title: r.title,
      institutionOrCompany: r.institutionOrCompany,
      description: r.description,
      startYear: r.startYear,
      endYear: r.endYear,
      isCurrent: r.isCurrent,
    };
  }

  static toDomainList(r?: ExperienceResponse[] | null): Experience[] {
    if (!r || r.length === 0) {
      return [];
    }
    return r.map((c) => this.toDomain(c));
  }
}
