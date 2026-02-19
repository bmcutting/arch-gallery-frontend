import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";

export class ProjectMapper {
  static toDomain(r: ProjectResponse): Project {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
    };
  }

  static toDomainList(r: ProjectResponse[]): Project[] {
    console.log(r);
    return r.map((project) => this.toDomain(project));
  }
}
