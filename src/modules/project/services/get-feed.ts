import { instance } from "../../app/modules/http/domain/instance";
import type { ProjectFeed } from "../domain/entities/project-feed";
import type { ProjectFeedResponse } from "../dto/read/project-feed";
import { ProjectMapper } from "./project-mapper";

export async function getProjectFeed(): Promise<ProjectFeed[]> {
  return instance.get<ProjectFeedResponse[]>("projects/feed").then((res) => {
    const projects = ProjectMapper.toFeedList(res.data);
    return projects;
  });
}
