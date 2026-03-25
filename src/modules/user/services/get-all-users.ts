import { instance } from "../../app/modules/http/domain/instance";
import type { PaginationResult } from "../../app/modules/shared/domain/core/pagination-result";
import type { PaginationResponse } from "../../app/modules/shared/dto/read/pagination";
import { PaginationResultMapper } from "../../app/modules/shared/services/pagination-result-mapper";
import type { User } from "../domain/entities/user";
import type { UserResponse } from "../dto/read/user";
import type { UserPaginationParams } from "../dto/write/user-pagination-params";
import { UserMapper } from "./user-mapper";

interface Props {
  controller?: AbortController;
  params?: UserPaginationParams;
}

export async function getAllUsers({
  params,
  controller,
}: Props): Promise<PaginationResult<User>> {
  return instance
    .get<PaginationResponse<UserResponse>>(`/users`, {
      params: params,
      signal: controller?.signal,
    })
    .then((res) => {
      return PaginationResultMapper.execute(res.data, UserMapper.execute);
    });
}
