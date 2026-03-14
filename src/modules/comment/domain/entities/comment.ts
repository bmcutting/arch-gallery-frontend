import type { UserSummary } from "../../../user/domain/entities/user-summary";

export interface Comment {
  id: string;
  userId: string;
  projectId: string;
  message: string;
  createdAt: Date;
  user: UserSummary;
}
