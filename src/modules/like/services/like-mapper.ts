import type { Like } from "../domain/entities/like";
import type { LikeResponse } from "../dto/read/like";

export class LikeMapper {
  static toDomain(r: LikeResponse): Like {
    return {
      id: r.id,
      projectId: r.projectId,
      userId: r.userId,
    };
  }

  static toDomainList(r?: LikeResponse[] | null): Like[] {
    if (!r || r.length === 0) {
      return [];
    }
    return r.map((like) => this.toDomain(like));
  }
}
