import { useEffect, useState } from "react";
import { getUserById } from "@modules/user/services/user/get-user-by-id";
import type { User } from "@modules/user/domain/entities/user";

interface Result {
  user?: User;
  loading: boolean;
  error: boolean;
}

interface FetchState {
  userId: string;
  user?: User;
  error: boolean;
}

export default function useProfileUser(userId: string): Result {
  const [state, setState] = useState<FetchState>();

  useEffect(() => {
    let active = true;

    getUserById(userId)
      .then((user) => {
        if (active) setState({ userId, user, error: false });
      })
      .catch(() => {
        if (active) setState({ userId, error: true });
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const isCurrent = state?.userId === userId;

  return {
    user: isCurrent ? state.user : undefined,
    loading: !isCurrent,
    error: isCurrent && state.error,
  };
}
