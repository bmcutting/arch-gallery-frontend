import { CategoryMapper } from "../../category/services/category-mapper";
import { CommentMapper } from "../../comment/services/comment-mapper";
import { LikeMapper } from "../../like/services/like-mapper";
import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";

export class ProjectMapper {
  static toDomain(r: ProjectResponse): Project {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      year: r.year,
      user: r.user,
      imagesUrl: r.imagesUrl ?? [],
      likes: LikeMapper.toDomainList(r.likes),
      comments: CommentMapper.toDomainList(r.comments),
      categories: CategoryMapper.toDomainList(r.categories),
      createdAt: new Date(r.createdAt),
    };
  }

  static toDomainList(r: ProjectResponse[]): Project[] {
    return r.map((project) => this.toDomain(project));
  }
}
