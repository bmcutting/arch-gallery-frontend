import { instance } from "@modules/app/modules/http/domain/instance";
import type { Success } from "@modules/user/dto/read/success";
import type { UpdateUserDto } from "@modules/user/dto/write/update-user";

export function updateUser(props: UpdateUserDto): Promise<Success> {
  return instance
    .put<Success>(`users/${props.userId}`, props)
    .then((data) => data.data);
}
