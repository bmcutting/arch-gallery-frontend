import { createContext } from "react";
import type { User } from "../domain/entities/user";

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    refreshUser: () => Promise<User | null>;
    logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined)
