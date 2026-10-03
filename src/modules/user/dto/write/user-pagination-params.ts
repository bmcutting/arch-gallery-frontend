import type { PaginationDTO } from "@modules/app/modules/shared/dto/write/pagination";
import type { UserSortFields } from "@modules/user/domain/enums/user-sort-fields";

export type UserPaginationParams = PaginationDTO & {
  search?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  createdAtMin?: Date;
  createdAtMax?: Date;
  deletedAtMin?: Date;
  deletedAtMax?: Date;
  email?: string;
  isActive?: boolean;
  sort?: Array<{ field: UserSortFields; order: "ASC" | "DESC" }>;
};
