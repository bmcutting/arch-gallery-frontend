import { instance } from "@modules/app/modules/http/domain/instance";
import type { User } from "@modules/user/domain/entities/user";
import type { UserResponse } from "@modules/user/dto/read/user";
import { UserMapper } from "./user-mapper";

export async function getMe(): Promise<User> {
  return instance.get<UserResponse>("users/me").then((data) => {
    return UserMapper.execute(data.data);
  });
}
