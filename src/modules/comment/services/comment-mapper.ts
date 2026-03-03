import type { Comment } from "../domain/entities/comment";
import type { CommentResponse } from "../dto/read/commentResponse";

export class CommentMapper {
  static toDomain(r: CommentResponse): Comment {
    return {
      id: r.id,
      projectId: r.projectId,
      userId: r.userId,
      message: r.message,
      createdAt: r.createdAt,
    };
  }

  static toDomainList(r: CommentResponse[]): Comment[] {
    return r.map((comment) => this.toDomain(comment));
  }
}
