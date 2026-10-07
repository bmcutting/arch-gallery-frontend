import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../domain/entities/user";
import { getMe } from "../services/user/get-me";
import { logoutUser } from "../services/user/logout-user";
import { UserContext } from "./user-context";
import {
    LOCAL_STORAGE_KEY,
    LocalStorage,
} from "@modules/app/entities/local-storage";
import { APP_ROUTES } from "@modules/app/domain/constants/app-routes";
import {
    clearSession,
    setSessionExpiredHandler,
} from "@modules/app/modules/http/domain/session";

const hasToken = () => Boolean(LocalStorage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN));

export default function UserProvider({ children }: PropsWithChildren) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(hasToken);

    const refreshUser = useCallback(
        () =>
            getMe()
                .then((data) => {
                    setUser(data);
                    return data;
                })
                .catch(() => {
                    setUser(null);
                    return null;
                })
                .finally(() => setLoading(false)),
        [],
    );

    const logout = useCallback(() => {
        const refreshToken = LocalStorage.get(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
        if (refreshToken) logoutUser(refreshToken).catch(() => undefined);

        clearSession();
        setUser(null);
        navigate(APP_ROUTES.LOGIN, { replace: true });
    }, [navigate]);

    useEffect(() => {
        if (hasToken()) refreshUser();
    }, [refreshUser]);

    useEffect(() => {
        setSessionExpiredHandler(() => {
            setUser(null);
            navigate(APP_ROUTES.LOGIN, { replace: true });
        });
        return () => setSessionExpiredHandler(null);
    }, [navigate]);

    return (
        <UserContext.Provider value={{ user, setUser, loading, refreshUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}
