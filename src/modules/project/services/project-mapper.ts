import { CategoryMapper } from "@modules/category/services/category-mapper";
import { CommentMapper } from "@modules/comment/services/comment-mapper";
import { LikeMapper } from "@modules/like/services/like-mapper";
import type { Project } from "@modules/project/domain/entities/project";
import type { ProjectResponse } from "@modules/project/dto/read/project";
import { UserMapper } from "@modules/user/services/user/user-mapper";

export class ProjectMapper {
  static toDomain(r: ProjectResponse): Project {
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      year: r.year,
      user: UserMapper.execute(r.user),
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
