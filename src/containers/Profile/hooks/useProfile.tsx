import { useEffect, useState } from "react";
import { getMe } from "../../../modules/user/services/get-me";
import type { User } from "../../../modules/user/domain/entities/user";

export default function useProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, [user?.id]);

  return user;
}
