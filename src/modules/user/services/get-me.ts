import { instance } from "../../app/modules/http/domain/instance";
import type { User } from "../domain/entities/user";
import type { UserResponse } from "../dto/read/user";
import { UserMapper } from "./user-mapper";

export async function getMe(): Promise<User> {
  return instance.get<UserResponse>("users/me").then((data) => {
    return UserMapper.execute(data.data);
  });
}
