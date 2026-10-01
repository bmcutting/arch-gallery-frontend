import { instance } from "@modules/app/modules/http/domain/instance";
import type { UserLoginResponse } from "@modules/user/dto/read/login";
import type { CreateUserDto } from "@modules/user/dto/write/create-user";

export function createUser(props: CreateUserDto): Promise<UserLoginResponse> {
  return instance
    .post<UserLoginResponse>("auth/register", props)
    .then((data) => data.data);
}
