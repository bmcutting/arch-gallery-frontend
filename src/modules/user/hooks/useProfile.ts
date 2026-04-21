import { useEffect, useState } from "react";
import { getMe } from "../services/user/get-me";
import type { User } from "../domain/entities/user";
import { APP_ROUTES } from "../../app/domain/constants/app-routes";

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
