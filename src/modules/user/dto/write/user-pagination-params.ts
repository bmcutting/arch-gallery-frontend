import type { PaginationDTO } from "../../../app/modules/shared/dto/write/pagination";

export type UserPaginationParams = PaginationDTO & {
  search?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  createdAtMin?: Date;
  createdAtMax?: Date;
  includeDeleted?: boolean;
  onlyDeleted?: boolean;
  deletedAtMin?: Date;
  deletedAtMax?: Date;
  email?: string;
  isActive?: boolean;
  sort?: string;
};
