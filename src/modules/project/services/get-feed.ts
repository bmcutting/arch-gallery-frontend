import { instance } from "../../app/modules/http/domain/instance";
import type { Project } from "../domain/entities/project";
import type { ProjectFeedItemResponse } from "./get-all-projects";
import { ProjectMapper } from "./project-mapper";

export interface ProjectFeedResponse {
  items: ProjectFeedItemResponse[];
  nextCursor: string | null;
}

export async function getProjectFeed(cursor?: string | null): Promise<{
  items: { project: Project; likedByUser: boolean }[];
  nextCursor: string | null;
}> {
  return instance
    .get<ProjectFeedResponse>("projects/feed", {
      params: { cursor },
    })
    .then((res) => ({
      items: res.data.items.map((item) => ({
        project: ProjectMapper.toDomain(item.project),
        likedByUser: item.likedByUser,
      })),
      nextCursor: res.data.nextCursor,
    }));
}
