import { instance } from "@modules/app/modules/http/domain/instance";
import type { UserLoginResponse } from "@modules/user/dto/read/login";
import type { LoginUserDTO } from "@modules/user/dto/write/login-user";

export function loginUser(props: LoginUserDTO): Promise<UserLoginResponse> {
    return instance
    .post<UserLoginResponse>("auth/login", props)
    .then((data) => data.data);
}
