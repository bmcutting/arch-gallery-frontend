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
      user: {
        id: r.user.id,
        userName: r.user.userName,
        profileImageUrl: r.user.profileImageUrl,
      },
    };
  }

  static toDomainList(r?: CommentResponse[] | null): Comment[] {
    if (!r || r.length === 0) {
      return [];
    }
    return r.map((c) => this.toDomain(c));
  }
}
