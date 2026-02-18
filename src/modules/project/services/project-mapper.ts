import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";

export class ProjectMapper {
  static execute(r: ProjectResponse): Project {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
    };
  }
}
