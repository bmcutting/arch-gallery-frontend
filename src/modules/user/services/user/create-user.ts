import { instance } from "../../../app/modules/http/domain/instance";
import type { UserLoginResponse } from "../../dto/read/login";
import type { CreateUserDto } from "../../dto/write/create-user";

export function createUser(props: CreateUserDto): Promise<UserLoginResponse> {
  return instance
    .post<UserLoginResponse>("auth/register", props)
    .then((data) => data.data);
}
