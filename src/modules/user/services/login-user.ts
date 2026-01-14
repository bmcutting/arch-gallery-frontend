import { instance } from "../../app/modules/http/domain/instance";
import type { UserLoginResponse } from "../dto/read/login";
import type { LoginUserDTO } from "../dto/write/login-user";

export function loginUser(props: LoginUserDTO): Promise<UserLoginResponse> {
    return instance
    .post<UserLoginResponse>("auth/sign-in", props)
    .then((data) => data.data);
}
