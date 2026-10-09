import type { User } from "@modules/user/domain/entities/user";

export type ProfileForm = Omit<User, "skills" | "experiences">;
