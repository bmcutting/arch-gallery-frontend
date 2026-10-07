import { instance } from "@modules/app/modules/http/domain/instance";

export function logoutUser(refreshToken: string): Promise<void> {
  return instance
    .post("auth/logout", { refresh_token: refreshToken })
    .then(() => undefined);
}
