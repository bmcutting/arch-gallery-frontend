import { CategoryMapper } from "../../category/services/category-mapper";
import type { Project } from "../domain/entities/project";
import type { ProjectFeed } from "../domain/entities/project-feed";
import type { ProjectResponse } from "../dto/read/project";
import type { ProjectFeedResponse } from "../dto/read/project-feed";

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

  static toProjectFeed(r: ProjectFeedResponse): ProjectFeed {
    return {
      id: r.id,
      title: r.title,
      previewImage: r.previewImage[1],
      author: {
        id: r.author.id,
        name: r.author.name,
        profileImage: r.author.profileImage,
      },
    };
  }

  static toFeedList(r: ProjectFeedResponse[]): ProjectFeed[] {
    let projects: ProjectFeed[] = [];
    projects = r.map((project) => {
      return this.toProjectFeed(project);
    });
    return projects;
  }
}
