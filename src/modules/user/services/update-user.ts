import { instance } from "../../app/modules/http/domain/instance";
import type { Success } from "../dto/read/success";
import type { UpdateUserDto } from "../dto/write/update-user";

export function updateUser(props: UpdateUserDto): Promise<Success> {
  return instance
    .put<Success>(`users/${props.userId}`, props)
    .then((data) => data.data);
}
