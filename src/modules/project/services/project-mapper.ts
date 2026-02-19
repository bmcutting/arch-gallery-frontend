import { CategoryMapper } from "../../category/services/category-mapper";
import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";

export class ProjectMapper {
  static toDomain(r: ProjectResponse): Project {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      year: r.year,
      categories: CategoryMapper.toDomainList(r.categories),
    };
  }

  static toDomainList(r: ProjectResponse[]): Project[] {
    return r.map((project) => this.toDomain(project));
  }
}
