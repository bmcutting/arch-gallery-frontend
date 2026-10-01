import type { PaginationResult } from "@modules/app/modules/shared/domain/core/pagination-result";
import type { PaginationResponse } from "@modules/app/modules/shared/dto/read/pagination";

export class PaginationResultMapper {
  static execute<R, T>(
    r: PaginationResponse<R>,
    mapper: (r: R) => T,
  ): PaginationResult<T> {
    return {
      hasNextPage: r.hasNextPage,
      items: r.items.map((r) => mapper(r)),
      pageSize: r.pageSize,
      totalPages: r.totalPages,
      totalItems: r.totalItems,
    };
  }
}
