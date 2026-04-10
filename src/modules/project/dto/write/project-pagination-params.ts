import type { PaginationDTO } from "../../../app/modules/shared/dto/write/pagination";
import type { ProjectSortFields } from "../../domain/enums/project-sort-fileds";

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
