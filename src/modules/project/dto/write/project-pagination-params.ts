import type { PaginationDTO } from "@modules/app/modules/shared/dto/write/pagination";
import type { ProjectSortFields } from "@modules/project/domain/enums/project-sort-fileds";

export type ProjectPaginationParams = PaginationDTO & {
  search?: string;
  title?: string;
  year?: number;
  createdAtMin?: Date;
  createdAtMax?: Date;
  includeDeleted?: boolean;
  onlyDeleted?: boolean;
  deletedAtMin?: Date;
  deletedAtMax?: Date;
  isActive?: boolean;
  sort?: Array<{ field: ProjectSortFields; order: "ASC" | "DESC" }>;
};
