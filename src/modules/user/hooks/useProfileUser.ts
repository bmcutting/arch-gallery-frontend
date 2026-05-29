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

/**
 * Carga los datos de un perfil.
 * - Sin `userId`: carga el usuario logueado (getMe) y, si falla, redirige al login.
 * - Con `userId`: carga ese usuario (getUserById) y, si falla, expone `error`
 *   sin redirigir (es el perfil de otra persona, no la sesión propia).
 */
export default function useProfileUser(userId?: string): Result {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    setUser(undefined);

    const request = userId ? getUserById(userId) : getMe();

    request
      .then((data) => {
        if (active) setUser(data);
      })
      .catch(() => {
        if (!active) return;
        if (userId) {
          setError(true);
        } else {
          window.location.href = APP_ROUTES.LOGIN;
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  return { user, loading, error };
}
