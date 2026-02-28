import { instance } from "../../app/modules/http/domain/instance";
import type { ProjectFeed } from "../domain/entities/project-feed";
import { ProjectMapper } from "./project-mapper";

export interface ProjectFeedResponse {
  items: ProjectFeed[];
  nextCursor: string | null;
}

export async function getProjectFeed(
  cursor?: string | null,
): Promise<ProjectFeedResponse> {
  return instance
    .get<ProjectFeedResponse>("projects/feed", {
      params: { cursor },
    })
    .then((res) => ({
      items: ProjectMapper.toFeedList(res.data.items),
      nextCursor: res.data.nextCursor,
    }));
}
