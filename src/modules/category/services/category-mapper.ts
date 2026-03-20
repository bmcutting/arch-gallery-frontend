import type { Category } from "../domain/entities/category";
import type { CategoryResponse } from "../dto/read/category";

export class CategoryMapper {
  static toDomain(r: CategoryResponse): Category {
    return {
      id: r.id,
      name: r.name,
    };
  }

  static toDomainList(r?: CategoryResponse[] | null): Category[] {
    if (!r || r.length === 0) {
      return [];
    }
    return r.map((c) => this.toDomain(c));
  }
}
