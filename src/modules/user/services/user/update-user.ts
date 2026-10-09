import { instance } from "@modules/app/modules/http/domain/instance";
import type { User } from "@modules/user/domain/entities/user";
import type { UserResponse } from "@modules/user/dto/read/user";
import type { UpdateUserDto } from "@modules/user/dto/write/update-user";
import { UserMapper } from "./user-mapper";

export function updateUser(userId: string, props: UpdateUserDto): Promise<User> {
  return instance
    .patch<UserResponse>(`users/${userId}`, props)
    .then((data) => UserMapper.execute(data.data));
}
