import type { ProjectResponse } from "./project";

export interface ProjectFeedResponse {
  project: ProjectResponse;
  likedByUser: boolean;
}
