import { instance } from "../../app/modules/http/domain/instance";
import type { Project } from "../domain/entities/project";
import type { ProjectResponse } from "../dto/read/project";
import { ProjectMapper } from "./project-mapper";

export interface ProjectFeedItem {
  project: ProjectResponse;
  likedByUser: boolean;
}

export interface ProjectFeedResponse {
  items: ProjectFeedItem[];
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
