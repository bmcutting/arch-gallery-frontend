import type { UserSummaryResponse } from "../../../user/dto/read/user-summary";

export interface CommentResponse {
  id: string;
  projectId: string;
  userId: string;
  message: string;
  createdAt: Date;
  user: UserSummaryResponse;
}
