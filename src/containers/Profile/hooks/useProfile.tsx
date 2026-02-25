import { useEffect, useState } from "react";
import { getMe } from "../../../modules/user/services/get-me";
import type { User } from "../../../modules/user/domain/entities/user";
import { APP_ROUTES } from "../../../modules/app/domain/constants/app-routes";

export default function useProfile() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        window.location.href = APP_ROUTES.LOGIN;
      });
  }, [user?.id]);

  return user;
}
