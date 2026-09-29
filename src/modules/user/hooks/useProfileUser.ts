import { useEffect, useState } from "react";
import { getMe } from "../services/user/get-me";
import { getUserById } from "../services/user/get-user-by-id";
import type { User } from "../domain/entities/user";
import { APP_ROUTES } from "../../app/domain/constants/app-routes";

interface Result {
  user?: User;
  loading: boolean;
  error: boolean;
}

interface FetchState {
  key: string;
  user?: User;
  error: boolean;
}

const OWN_PROFILE_KEY = "me";

export default function useProfileUser(userId?: string): Result {
  const key = userId ?? OWN_PROFILE_KEY;
  const [state, setState] = useState<FetchState>();

  useEffect(() => {
    let active = true;
    const request = userId ? getUserById(userId) : getMe();

    request
      .then((user) => {
        if (active) setState({ key, user, error: false });
      })
      .catch(() => {
        if (!active) return;
        if (userId) {
          setState({ key, error: true });
        } else {
          window.location.href = APP_ROUTES.LOGIN;
        }
      });

    return () => {
      active = false;
    };
  }, [key, userId]);

  const isCurrent = state?.key === key;

  return {
    user: isCurrent ? state.user : undefined,
    loading: !isCurrent,
    error: isCurrent && state.error,
  };
}
